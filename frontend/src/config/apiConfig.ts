// src/config/apiConfig.ts

export interface ApiConfig {
  useMockData: boolean;
  apiUrl: string;
}

const defaultConfig: ApiConfig = {
  useMockData: true, // Set to true by default for development
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000'
};

class ApiConfigService {
  private static instance: ApiConfigService;
  private config: ApiConfig;

  private constructor() {
    // Load config from localStorage or use default
    const savedConfig = localStorage.getItem('apiConfig');
    this.config = savedConfig ? JSON.parse(savedConfig) : defaultConfig;
  }

  public static getInstance(): ApiConfigService {
    if (!ApiConfigService.instance) {
      ApiConfigService.instance = new ApiConfigService();
    }
    return ApiConfigService.instance;
  }

  public getConfig(): ApiConfig {
    return this.config;
  }

  public setUseMockData(useMock: boolean): void {
    this.config.useMockData = useMock;
    this.saveConfig();
  }

  public setApiUrl(url: string): void {
    this.config.apiUrl = url;
    this.saveConfig();
  }

  private saveConfig(): void {
    localStorage.setItem('apiConfig', JSON.stringify(this.config));
  }
}

export const apiConfig = ApiConfigService.getInstance();
export default apiConfig;
