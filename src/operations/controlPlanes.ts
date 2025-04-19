import { KongApi } from "../api.js";

/**
 * List all control planes in the organization
 */
export async function listControlPlanes(
  api: KongApi,
  pageSize = 10,
  pageNumber?: number,
  filterName?: string,
  filterClusterType?: string,
  filterCloudGateway?: boolean,
  labels?: string,
  sort?: string
) {
  try {
    const result = await api.listControlPlanes(
      pageSize, 
      pageNumber, 
      filterName, 
      filterClusterType, 
      filterCloudGateway, 
      labels, 
      sort
    );

    // Transform the response to have consistent field names
    return {
      metadata: {
        pageSize: pageSize,
        pageNumber: pageNumber || 1,
        totalPages: result.meta.page_count,
        totalCount: result.meta.total_count,
        filters: {
          name: filterName || null,
          clusterType: filterClusterType || null,
          cloudGateway: filterCloudGateway !== undefined ? filterCloudGateway : null,
          labels: labels || null
        },
        sort: sort || null
      },
      controlPlanes: result.data.map((cp: any) => ({
        controlPlaneId: cp.id,
        name: cp.name,
        description: cp.description,
        type: cp.type,
        clusterType: cp.cluster_type,
        controlPlaneEndpoint: cp.control_plane_endpoint,
        telemetryEndpoint: cp.telemetry_endpoint,
        hasCloudGateway: cp.has_cloud_gateway,
        labels: cp.labels,
        metadata: {
          createdAt: cp.created_at,
          updatedAt: cp.updated_at
        }
      })),
      usage: {
        instructions: "Use the controlPlaneId from these results with other tools like list-services, list-data-plane-nodes, etc.",
        pagination: "For more results, increment pageNumber or increase pageSize"
      }
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Get detailed information about a specific control plane
 */
export async function getControlPlane(
  api: KongApi,
  controlPlaneId: string
) {
  try {
    const result = await api.getControlPlane(controlPlaneId);
    console.error(`getControlPlane result: ${JSON.stringify(result, null, 2)}`);

    // The response is the control plane object directly, not wrapped in a data property
    const cp = result;
    
    // Check if the response is valid
    if (!cp || !cp.id) {
      console.error(`Invalid response format: ${JSON.stringify(result, null, 2)}`);
      throw new Error("Invalid response format from API");
    }

    return {
      controlPlaneDetails: {
        controlPlaneId: cp.id,
        name: cp.name,
        description: cp.description || "",
        type: cp.type || "",
        clusterType: cp.config?.cluster_type || "",
        controlPlaneEndpoint: cp.config?.control_plane_endpoint || "",
        telemetryEndpoint: cp.config?.telemetry_endpoint || "",
        hasCloudGateway: cp.config?.cloud_gateway || false,
        labels: cp.labels || {},
        metadata: {
          createdAt: cp.created_at,
          updatedAt: cp.updated_at
        }
      },
      relatedTools: [
        "Use list-services to see services configured in this control plane",
        "Use list-routes to see routes configured in this control plane",
        "Use query-api-requests to analyze traffic for this control plane"
      ]
    };
  } catch (error) {
    throw error;
  }
}

/**
 * List all control planes that are members of a specific group
 */
export async function listControlPlaneGroupMemberships(
  api: KongApi,
  groupId: string,
  pageSize = 10,
  pageAfter?: string
) {
  try {
    const result = await api.listControlPlaneGroupMemberships(groupId, pageSize, pageAfter);

    // Transform the response to have consistent field names
    return {
      metadata: {
        groupId: groupId,
        pageSize: pageSize,
        pageAfter: pageAfter || null,
        nextPageAfter: result.meta?.next_page?.after || null,
        totalCount: result.meta?.total_count || 0
      },
      members: result.data.map((member: any) => ({
        controlPlaneId: member.id,
        name: member.name,
        description: member.description,
        type: member.type,
        clusterType: member.cluster_type,
        membershipStatus: {
          status: member.cp_group_member_status?.status,
          message: member.cp_group_member_status?.message,
          conflicts: member.cp_group_member_status?.conflicts || []
        },
        metadata: {
          createdAt: member.created_at,
          updatedAt: member.updated_at
        }
      })),
      relatedTools: [
        "Use get-control-plane-group-status to check for configuration conflicts",
        "Use check-control-plane-group-membership to verify if a specific control plane is a member",
        "Use get-control-plane to get more details about a specific member"
      ]
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Check if a control plane is a member of any group
 */
export async function checkControlPlaneGroupMembership(
  api: KongApi,
  controlPlaneId: string
) {
  try {
    const result = await api.checkControlPlaneGroupMembership(controlPlaneId);

    // Transform the response to have consistent field names
    const membership = result.data;
    return {
      controlPlaneId: controlPlaneId,
      groupMembership: {
        isMember: membership.is_member,
        groupId: membership.group_id,
        groupName: membership.group_name,
        status: membership.status,
        message: membership.message,
        conflicts: membership.conflicts || []
      },
      relatedTools: [
        "Use list-control-plane-group-memberships to see all members of this group",
        "Use get-control-plane to get more details about this control plane"
      ]
    };
  } catch (error) {
    throw error;
  }
}
