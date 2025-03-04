import ApiManager from "./Api/ApiManager";

const packageRequest = "/ems/package";

class PackageService {
  access = async () => {
    return ApiManager.apiGet(`/ems/package/access`, {});
  };

  add = async (inventoryDto) => {
    return ApiManager.apiPost(`${packageRequest}/create`, inventoryDto);
  };
  edit = async (inventoryId) => {
    return ApiManager.apiPost(
      `${packageRequest}/${inventoryId.id}`,
      inventoryId
    );
  };
  delete = async (inventoryId) => {
    return ApiManager.apiDelete(`${packageRequest}/${inventoryId}`, {});
  };
  confirm = async (code) => {
    return ApiManager.apiPost(`${packageRequest}/confirm/${code}`, {});
  };

  reject = async (code) => {
    return ApiManager.apiPost(`${packageRequest}/reject/${code}`, {});
  };

  getData = async (username) => {
    return ApiManager.apiPost(`${packageRequest}/viewdualauth/${username}`, {});
  };

  getHistory = async (page, size, sortCol, sortType) => {
    var request_string = "";
    if (page !== null || page !== undefined) {
      request_string = request_string + `page=${page}`;
    } else {
      request_string = request_string + `page=0`;
    }
    if (size !== null) {
      request_string = request_string + `&size=${size}`;
    } else {
      request_string = request_string + `&size=5`;
    }
    if (sortCol !== "" && sortType !== undefined && sortType !== null) {
      request_string =
        request_string + `&sort=${sortCol},${sortType ? "desc" : "asc"}`;
    }
    return ApiManager.apiPost(
      `${packageRequest}/history?${request_string}`,
      {}
    );
  };

  getList = async () =>
    // page,
    // size,
    // sortCol,
    // sortType,
    // search,
    // searchParams
    {
      // var request_string = ``
      // if (page !== null || page !== undefined) {
      //   request_string = request_string + `page=${page}`
      // } else {
      //   request_string = request_string + `page=0`
      // }
      // if (size !== null) {
      //   request_string = request_string + `&size=${size}`
      // } else {
      //   request_string = request_string + `&size=5`
      // }
      // if (sortCol !== '' && sortType !== undefined && sortType !== null) {
      //   if (sortCol === 'userleveldesc') {
      //     request_string =
      //       request_string + `&sort=userlevel,${sortType ? 'desc' : 'asc'}`
      //   } else if (sortCol === 'statusdesc') {
      //     request_string =
      //       request_string + `&sort=status,${sortType ? 'desc' : 'asc'}`
      //   } else {
      //     request_string =
      //       request_string + `&sort=${sortCol},${sortType ? 'desc' : 'asc'}`
      //   }
      // }
      // if (search !== null) {
      //   request_string = request_string + `&search=${search}`
      // } else {
      //   request_string = request_string + `&search=false`
      // }

      return ApiManager.apiGet(`${packageRequest}/getall`);
    };
  getDualAuthList = async (
    page,
    size,
    sortCol,
    sortType,
    search,
    searchParam
  ) => {
    var request_string = ``;

    if (page !== null || page !== undefined) {
      request_string = request_string + `page=${page}`;
    } else {
      request_string = request_string + `page=0`;
    }
    if (size !== null) {
      request_string = request_string + `&size=${size}`;
    } else {
      request_string = request_string + `&size=5`;
    }
    if (sortCol !== "" && sortType !== undefined && sortType !== null) {
      if (sortCol === "userleveldesc") {
        request_string =
          request_string + `&sort=userlevel,${sortType ? "desc" : "asc"}`;
      } else if (sortCol === "statusdesc") {
        request_string =
          request_string + `&sort=status,${sortType ? "desc" : "asc"}`;
      } else {
        request_string =
          request_string + `&sort=${sortCol},${sortType ? "desc" : "asc"}`;
      }
    }
    if (search !== null) {
      request_string = request_string + `&search=${search}`;
    } else {
      request_string = request_string + `&search=false`;
    }

    return ApiManager.apiPost(
      `${packageRequest}/dualauthlist?${request_string}`,
      searchParam
    );
  };
}

export default new PackageService();
