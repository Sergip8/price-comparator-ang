import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { animate, state, style, transition, trigger } from "@angular/animations";

// Services
import { BrandFilterService } from "src/app/service/brand-filter.service";
import { MenuService, StoreType } from "src/app/service/menu-service";
import { SortService } from "src/app/service/sort-products.service";
import { UIService } from "src/app/service/ui.service";
import { AuthAltasService } from "src/app/service/auth-atlas.service";
import { ProductAtlasService } from "src/app/service/product-atlas.service";
import { UserService } from "src/app/service/user.service";

// Models
import { TvFilters } from "src/app/models/tv-filters";
import { ProductPayload } from "src/app/models/product-payload";
import { SortOptions } from "./sort-select";
import { Filters, Product, ProductResponse } from "src/app/models/product-atlas";

export enum FilterSelectedState {
  CATEGORY,
  BRAND,
  FILTERS,
}

@Component({
  selector: "products-view",
  templateUrl: "./view-result-listU.component.html",
  styleUrls: ["./view-result-listU.component.css"],
  animations: [
    trigger('sidebarTrigger', [
      state('open', style({ transform: 'translateX(0%)' })),
      state('close', style({ transform: 'translateX(100%)' })),
      transition('open => close', [
        animate('300ms ease-in')
      ]),
      transition('close => open', [
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class ViewResultListUComponent implements OnInit, OnDestroy {
  // State variables
  filterState: FilterSelectedState;
  sidebarTitle: string = "";
  showDeleteFavoriteMessage: boolean = false;
  updatePriceRange: boolean = true;
  search_value: string = "";
  category_value: string = "";
  countProducts: number = 0;
  tecRes: Product[] = [];
  brands: string[] = [];
  priceRange: number[] = [];
  priceRangeTemp: number[] = [0, 100000000];
  flag: boolean = true;
  loading: boolean = false;
  categoryParam: string;
  currentRoute: string;
  isProductResponse: boolean = false;
  tvFilterSelected: TvFilters;
  productPayload: ProductPayload = new ProductPayload();
  showFilterMobile: boolean = false;
  filterMobileAction: string;
  typeStore: StoreType;
  isPartesPc: boolean = false;
  updateFilters: boolean = true;
  isFavoriteView: boolean = false;
  favoritesSelected: string[] = [];
  favoriteIds: string[] = [];
  
  // Subscriptions collection
  private subscriptions: Subscription[] = [];

  constructor(
    private service: ProductAtlasService,
    private activatedRoute: ActivatedRoute,
    public brandFilter: BrandFilterService,
    private menuService: MenuService,
    private router: Router,
    private userService: UserService,
    private sortService: SortService,
    private auth: AuthAltasService,
    public uiService: UIService
  ) {
    // Get favorite IDs from navigation state if available
    const navState = this.router.getCurrentNavigation()?.extras.state;
    if (navState && navState['productIds']) {
      this.favoriteIds = navState['productIds'];
    }
  }

  ngOnInit(): void {
    this.showFilterMobile = false;
    this.initializeComponent();
  }
  
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Initialize component and subscribe to services
   */
  private initializeComponent(): void {
    // Subscribe to store type
    const storeTypeSub = this.menuService.storeTypeState$.subscribe(storeType => {
      this.productPayload.typeStore = storeType;
    });
    this.subscriptions.push(storeTypeSub);
    
    // Initialize brand filter service
    this.brandFilter.getBrands();
    this.brandFilter.getPriceRangeState();
    this.brandFilter.setFilterList();
    
    // Get current URL and parse parameters
    this.parseUrlParameters();
    
    // Initialize search if parameters exist
    if (this.productPayload.search || this.productPayload.category || this.productPayload.favoriteIds.length > 0) {
      this.getSearchResult();
    }
  }

  /**
   * Parse URL parameters to set up search filters
   */
  private parseUrlParameters(): void {
    const url = new URL(window.location.href);
    this.currentRoute = url.pathname;
    
    // Extract query parameters
    const search = url.searchParams.get("q");
    const category = url.searchParams.get("cat");
    const queryBrands = url.searchParams.get("brands");
    const queryPriceRange = url.searchParams.get("priceRange");
    const filters = url.searchParams.get("filters");
    const operator = url.searchParams.get("operator");
    const sort = url.searchParams.get("sort");
    const page = url.searchParams.get("page");
    
    // Set operator
    this.productPayload.operator = operator || "and";
    
    // Set flag for default behavior
    this.flag = true;
    
    if (search) {
      this.handleSearchQuery(search, category, filters, sort, queryPriceRange, queryBrands);
    } else {
      this.handleCategoryNavigation(queryBrands, filters, sort, queryPriceRange, page);
    }
    
    // Handle favorites view
    if (this.currentRoute === "/favoritos" && !this.productPayload.category && !this.search_value) {
      this.isFavoriteView = true;
      this.flag = true;
      this.productPayload.favoriteIds = this.userService.getLocalFavorites();
    }
  }

  /**
   * Handle search query parameters
   */
  private handleSearchQuery(
    search: string,
    category: string,
    filters: string,
    sort: string,
    queryPriceRange: string,
    queryBrands: string
  ): void {
    this.search_value = search;
    this.category_value = category || "";
    this.sidebarTitle = this.search_value;
    
    // Set search parameters
    this.productPayload.search = this.search_value;
    this.brandFilter.updateSort("Relevancia");
    this.priceRange = this.priceRangeTemp;
    this.categoryParam = "";
    
    // Update menu service
    this.menuService.resetLinkTree();
    this.menuService.addLinkTree({ type: "search", value: this.search_value });
    
    // Process URL parameters
    this.getUrlCat();
    this.getUrlFilters(filters);
    this.getUrlSort(sort);
    this.getUrlPriceRange(queryPriceRange);
    this.getUrlBrands(queryBrands);
  }

  /**
   * Handle category navigation parameters
   */
  private handleCategoryNavigation(
    queryBrands: string,
    filters: string,
    sort: string,
    queryPriceRange: string,
    page: string
  ): void {
    this.brandFilter.updateSort("Relevancia");
    this.menuService.resetLinkTree();
    this.search_value = "";
    
    const paramSub = this.activatedRoute.params.subscribe((params) => {
      let categories = [];
      
      // Extract categories from route parameters
      for (let i = 0; i <= 2; i++) {
        const categoryParam = `category${i}`;
        if (params[categoryParam]) {
          categories.push(params[categoryParam]);
          this.menuService.addLinkTree({ type: "category", value: params[categoryParam] });
        }
      }
      
      // Set sidebar title
      if (categories.length > 0) {
        this.sidebarTitle = categories[categories.length - 1];
      }
      
      // Handle PC parts specific store type
      if (categories[0] === "partes-pc") {
        this.productPayload.typeStore = StoreType.PARTES_PC;
        this.isPartesPc = true;
      }
      
      // Join categories and update payload
      const joinedCategories = categories.join("/");
      this.menuService.categoryLink.next(joinedCategories);
      this.productPayload.category = joinedCategories;
      
      // Process URL parameters
      this.getUrlBrands(queryBrands);
      this.getUrlFilters(filters);
      this.getUrlSort(sort);
      this.getUrlPriceRange(queryPriceRange);
      this.getUrlPage(page);
    });
    
    this.subscriptions.push(paramSub);
  }

  /**
   * Process category URL parameter
   */
  getUrlCat(): void {
    if (!this.category_value) {
      this.category_value = "";
    } else {
      this.flag = true;
      
      if (this.search_value) {
        const splitCat = this.category_value.split(",");
        this.productPayload.categoryFilter = splitCat.join("/");
        
        splitCat.forEach(category => {
          this.menuService.addLinkTree({ type: "category", value: category });
        });
      }
    }
  }

  /**
   * Process sort URL parameter
   */
  getUrlSort(sort: string): void {
    if (sort) {
      const sortOptions: string[] = Object.values(SortOptions);
      
      if (sortOptions.includes(sort)) {
        this.brandFilter.updateSort(sort);
        this.productPayload.sort = this.sortConverter(sort);
      }
    } else {
      this.productPayload.sort = this.sortConverter("Relevancia");
    }
  }

  /**
   * Process brands URL parameter
   */
  getUrlBrands(queryBrands: string): void {
    if (queryBrands) {
      this.updatePriceRange = true;
      this.flag = false;
      this.updateFilters = true;
      
      this.productPayload.brands = queryBrands.split(",");
      this.brandFilter.brandsSelected.next(this.productPayload.brands);
      this.menuService.addLinkTree({ type: "brand", value: queryBrands.toLowerCase() });
      this.filterState = FilterSelectedState.BRAND;
    } else {
      this.brandFilter.brandsSelected.next([]);
    }
  }

  /**
   * Process filters URL parameter
   */
  getUrlFilters(filters: string): void {
    if (filters) {
      this.updatePriceRange = true;
      
      try {
        let filterList = [];
        const filterObj = JSON.parse(filters);
        
        this.brandFilter.setFilters(filterObj);
        const filterNames = Object.getOwnPropertyNames(filterObj);
        this.brandFilter.updateFilterListSelected(filterNames);
        
        filterNames.forEach(name => {
          filterObj[name].forEach(value => {
            filterList.push(`${name}_${value}`);
            this.menuService.addLinkTree({ type: "filter", value: `${name}_${value}` });
          });
        });
        
        this.productPayload.filterList = filterList;
        
        if (filterList.length === 0) {
          this.brandFilter.updateIsFilterEmpty(true);
        }
      } catch (error) {
        console.error('Error parsing filters:', error);
      }
    } else {
      this.brandFilter.updateFilterListSelected([]);
      this.brandFilter.setFilters({});
    }
  }

  /**
   * Process price range URL parameter
   */
  getUrlPriceRange(queryPriceRange: string): void {
    if (queryPriceRange) {
      this.flag = true;
      this.updatePriceRange = false;
      
      this.productPayload.priceRange = queryPriceRange.split(",").map(Number);
      this.brandFilter.updatePriceRange(this.productPayload.priceRange);
    } else {
      this.priceRange = this.priceRangeTemp;
    }
  }

  /**
   * Process page URL parameter
   */
  getUrlPage(page: string): void {
    if (page) {
      this.productPayload.page = parseInt(page, 10);
    } else {
      this.productPayload.page = 1;
    }
  }

  /**
   * Search for products based on current payload
   */
  getSearchResult(): void {
    this.loading = true;
    
    if (this.favoriteIds && this.favoriteIds.length > 0) {
      this.productPayload.favoriteIds = this.favoriteIds;
    }
    
    this.search();
  }

  /**
   * Execute search API call
   */
  search(): void {
    this.service.getTecResultUnified(this.productPayload)
      .subscribe({
        next: (data) => {
          this.setProduct(data);
          this.loading = false;
        },
        error: (error) => {
          console.error('Search error:', error);
          this.loading = false;
        }
      });
  }

  /**
   * Process product response data
   */
  setProduct(data: ProductResponse): void {
    this.tecRes.push(...data.paginatedResults);
    
    if (data.totalCount && data.totalCount?.[0]) {
      this.countProducts = data.totalCount[0].count;
    }
    
    this.isProductResponse = this.tecRes.length > 0;
    
    if (data.parameters.length > 0) {
      // Update brands if needed
      if (this.brands.length === 0 && this.filterState !== FilterSelectedState.BRAND) {
        this.brandFilter.updateFilterBrands(data.parameters[0].brands);
        this.brandFilter.updateBrands(data.parameters[0].brands);
      }
      
      // Update price range if needed
      if (this.updatePriceRange && this.isProductResponse) {
        const priceRange = [data.parameters[0].minPrice, data.parameters[0].maxPrice];
        this.brandFilter.updatePriceRangeState(priceRange);
        this.brandFilter.updatePriceRange(priceRange);
        this.brandFilter.updateSessionPriceRangeState(priceRange);
      }
      
      // Update filter list and categories
      this.brandFilter.updateFilterList(this.orderFilter(data.filters));
      this.brandFilter.categories.next(this.menuService.listaAObjeto(data.parameters[0].categories));
    }
  }

  /**
   * Handle infinite scroll functionality
   */
  onNearEndScroll(): void {
    const hasMoreProducts = this.countProducts > this.productPayload.page * this.productPayload.size;
    
    if (hasMoreProducts) {
      this.productPayload.page += 1;
      this.flag = false;
      this.getSearchResult();
    }
  }

  /**
   * Order and format filters from API response
   */
  orderFilter(filters: Filters[]): any {
    filters.sort();
    
    const filterItems = [];
    const filteredResults = {};
    
    // Process filters
    filters.forEach(filter => {
      const [filterName, filterValue] = filter._id.split("_");
      filterItems.push([filterName, [filterValue, filter.count]]);
    });
    
    filterItems.sort();
    
    // Group filters by name
    filterItems.forEach(item => {
      const [filterName, filterValueData] = item;
      
      if (!filteredResults[filterName]) {
        filteredResults[filterName] = [];
      }
      
      filteredResults[filterName].push([filterValueData[0], filterValueData[1]]);
    });
    
    return filteredResults;
  }

  /**
   * Convert sort option string to sort object for API
   */
  sortConverter(sort: string): any {
    switch (sort) {
      case "Mayor precio":
        return { price: -1 };
      case "Menor precio":
        return { price: 1 };
      case "A-Z":
        return { name: 1 };
      case "Z-A":
        return { name: -1 };
      case "Relevancia":
        return { _id: 1 };
      default:
        return { _id: -1 };
    }
  }

  /**
   * Handle filter icon click for mobile
   */
  onClickFilterIcon(): void {
    this.productPayload.operator = "or";
    this.showFilterMobile = true;
  }

  /**
   * Track selected favorites
   */
  favoriteSelected(favoritesSelected: string[]): void {
    this.favoritesSelected = favoritesSelected;
  }

  /**
   * Show confirmation dialog for deleting favorites
   */
  confirmDelete(): void {
    this.showDeleteFavoriteMessage = true;
  }

  /**
   * Delete selected favorite items
   */
  deleteFavorites(): void {
    const user = this.auth.getCurrentUser();
    
    if (user) {
      this.userService.setUserFavorite(user.id, this.favoritesSelected, user.accessToken)
        .subscribe({
          next: () => {
            this.showDeleteFavoriteMessage = false;
            
            // Update local favorites
            this.favoritesSelected.forEach(favoriteId => {
              this.userService.setLocalFavorites(favoriteId);
            });
            
            // Remove deleted favorites from display
            this.tecRes = this.tecRes.filter(product => !this.favoritesSelected.includes(product._id));
          },
          error: (error) => {
            console.error('Error deleting favorites:', error);
            this.showDeleteFavoriteMessage = false;
          }
        });
    }
  }
}