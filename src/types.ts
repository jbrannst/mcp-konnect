export interface ApiRequestFilter {
    field: string;
    operator: string;
    value: any;
  }
  
  export interface TimeRange {
    type: "relative";
    time_range: string;
  }
  
  export interface ApiRequestResult {
    request_id: string;
    request_start: string;
    http_method: string;
    request_uri: string;
    status_code: number;
    response_http_status?: number;
    consumer?: string;
    gateway_service?: string;
    route?: string;
    latencies_response_ms: number;
    latencies_kong_gateway_ms: number;
    latencies_upstream_ms: number;
    client_ip: string;
    api_product?: string;
    api_product_version?: string;
    application?: string;
    auth_type?: string;
    header_host?: string;
    header_user_agent?: string;
    data_plane_node?: string;
    data_plane_node_version?: string;
    control_plane?: string;
    control_plane_group?: string;
    ratelimit_enabled?: boolean;
    ratelimit_limit?: number;
    ratelimit_remaining?: number;
    ratelimit_reset?: number;
    ratelimit_enabled_second?: boolean;
    ratelimit_limit_second?: number;
    ratelimit_remaining_second?: number;
    ratelimit_enabled_minute?: boolean;
    ratelimit_limit_minute?: number;
    ratelimit_remaining_minute?: number;
    ratelimit_enabled_hour?: boolean;
    ratelimit_limit_hour?: number;
    ratelimit_remaining_hour?: number;
    ratelimit_enabled_day?: boolean;
    ratelimit_limit_day?: number;
    ratelimit_remaining_day?: number;
    ratelimit_enabled_month?: boolean;
    ratelimit_limit_month?: number;
    ratelimit_remaining_month?: number;
    ratelimit_enabled_year?: boolean;
    ratelimit_limit_year?: number;
    ratelimit_remaining_year?: number;
    service_port?: string;
    service_protocol?: string;
    request_body_size?: number;
    response_body_size?: number;
    response_header_content_type?: string;
    response_header_content_length?: string;
    trace_id?: string;
    upstream_uri?: string;
    upstream_status?: string;
  }
  
  export interface ApiRequestsResponse {
    meta: {
      size: number;
      time_range: {
        start: string;
        end: string;
      };
    };
    results: ApiRequestResult[];
  }
  
  export interface ControlPlane {
    id: string;
    name: string;
    description?: string;
    type: string;
    cluster_type: string;
    control_plane_endpoint: string;
    telemetry_endpoint: string;
    has_cloud_gateway: boolean;
    labels?: Record<string, string>;
    created_at: string;
    updated_at: string;
  }
  
  export interface EntityMetadata {
    created_at: string;
    updated_at: string;
  }
  
  export interface Service {
    id: string;
    name: string;
    host: string;
    port: number;
    protocol: string;
    path?: string;
    retries?: number;
    connect_timeout?: number;
    write_timeout?: number;
    read_timeout?: number;
    tags?: string[];
    client_certificate?: string;
    tls_verify?: boolean;
    tls_verify_depth?: number;
    ca_certificates?: string[];
    enabled: boolean;
    created_at: string;
    updated_at: string;
  }
  
  export interface Route {
    id: string;
    name: string;
    protocols: string[];
    methods?: string[];
    hosts?: string[];
    paths?: string[];
    https_redirect_status_code?: number;
    regex_priority?: number;
    strip_path?: boolean;
    preserve_host?: boolean;
    request_buffering?: boolean;
    response_buffering?: boolean;
    tags?: string[];
    service?: {
      id: string;
    };
    enabled: boolean;
    created_at: string;
    updated_at: string;
  }
  
  export interface Consumer {
    id: string;
    username?: string;
    custom_id?: string;
    tags?: string[];
    enabled: boolean;
    created_at: string;
    updated_at: string;
  }
  
  export interface Plugin {
    id: string;
    name: string;
    enabled: boolean;
    config: Record<string, any>;
    protocols: string[];
    tags?: string[];
    consumer?: {
      id: string;
    };
    service?: {
      id: string;
    };
    route?: {
      id: string;
    };
    created_at: string;
    updated_at: string;
  }
  
export interface GroupMember {
  id: string;
  name: string;
  description?: string;
  type: string;
  cluster_type: string;
  cp_group_member_status?: {
    status: string;
    message: string;
    conflicts?: any[];
  };
  created_at: string;
  updated_at: string;
}

// Dev Portal Types
export interface DevPortalApi {
  id: string;
  name: string;
  description?: string;
  version?: string;
  published: boolean;
  deprecated: boolean;
  specification?: string;
  specification_format?: string;
  created_at: string;
  updated_at: string;
}

export interface DevPortalApplication {
  id: string;
  name: string;
  description?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DevPortalSubscription {
  id: string;
  api: {
    id: string;
    name: string;
  };
  application: {
    id: string;
    name: string;
  };
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DevPortalApiKey {
  id: string;
  key: string;
  name: string;
  subscription: {
    id: string;
    api: {
      id: string;
      name: string;
    };
    application: {
      id: string;
      name: string;
    };
  };
  expires_at?: string;
  created_at: string;
  updated_at: string;
}
