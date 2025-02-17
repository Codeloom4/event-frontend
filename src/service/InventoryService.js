import ApiManager from './Api/ApiManager'

const inventoryManagementReq = '/ems/inventory'
class UserManagementService {
  add = async (userRoleDto) => {
    return ApiManager.apiPost(`${inventoryManagementReq}/add`, userRoleDto)
  }
  edit = async (userRoleDto) => {
    return ApiManager.apiPost(`${inventoryManagementReq}/edit`, userRoleDto)
  }
  delete = async (roleCode) => {
    return ApiManager.apiPost(`${inventoryManagementReq}/delete/${roleCode}`, {})
  }
  access = async (auditOnly) => {
    var request_string = ``
    if (auditOnly == undefined) {
      request_string = request_string + `&auditOnly=${false}`
    } else {
      request_string = request_string + `&auditOnly=${true}`
    }
    return ApiManager.apiPost(`${inventoryManagementReq}/access?${request_string}`, {})
  }

  confirm = async (code) => {
    return ApiManager.apiPost(`${inventoryManagementReq}/confirm/${code}`, {})
  }

  reject = async (code) => {
    return ApiManager.apiPost(`${inventoryManagementReq}/reject/${code}`, {})
  }

  getData = async (username) => {
    return ApiManager.apiPost(`${inventoryManagementReq}/viewdualauth/${username}`, {})
  }

  getHistory = async (
    page,
    size,
    sortCol,
    sortType
  ) => {
    var request_string = ''
    if (page !== null || page !== undefined) {
      request_string = request_string + `page=${page}`
    } else {
      request_string = request_string + `page=0`
    }
    if (size !== null) {
      request_string = request_string + `&size=${size}`
    } else {
      request_string = request_string + `&size=5`
    }
    if (sortCol !== '' && sortType !== undefined && sortType !== null) {
      request_string =
        request_string + `&sort=${sortCol},${sortType ? 'desc' : 'asc'}`
    }
    return ApiManager.apiPost(`${inventoryManagementReq}/history?${request_string}`, {})
  }

  getList = async (
    page,
    size,
    sortCol,
    sortType,
    search,
    searchParams
  ) => {
    var request_string = ``
    if (page !== null || page !== undefined) {
      request_string = request_string + `page=${page}`
    } else {
      request_string = request_string + `page=0`
    }
    if (size !== null) {
      request_string = request_string + `&size=${size}`
    } else {
      request_string = request_string + `&size=5`
    }
    if (sortCol !== '' && sortType !== undefined && sortType !== null) {
      if (sortCol === 'userleveldesc') {
        request_string =
          request_string + `&sort=userlevel,${sortType ? 'desc' : 'asc'}`
      } else if (sortCol === 'statusdesc') {
        request_string =
          request_string + `&sort=status,${sortType ? 'desc' : 'asc'}`
      } else {
        request_string =
          request_string + `&sort=${sortCol},${sortType ? 'desc' : 'asc'}`
      }
    }
    if (search !== null) {
      request_string = request_string + `&search=${search}`
    } else {
      request_string = request_string + `&search=false`
    }

    return ApiManager.apiPost(
      `${inventoryManagementReq}/list?${request_string}`,
      searchParams
    )
  }
  getDualAuthList = async (
    page,
    size,
    sortCol,
    sortType,
    search ,
    searchParam
  ) => {
    var request_string = ``

    if (page !== null || page !== undefined) {
      request_string = request_string + `page=${page}`
    } else {
      request_string = request_string + `page=0`
    }
    if (size !== null) {
      request_string = request_string + `&size=${size}`
    } else {
      request_string = request_string + `&size=5`
    }
    if (sortCol !== '' && sortType !== undefined && sortType !== null) {
      if (sortCol === 'userleveldesc') {
        request_string =
          request_string + `&sort=userlevel,${sortType ? 'desc' : 'asc'}`
      } else if (sortCol === 'statusdesc') {
        request_string =
          request_string + `&sort=status,${sortType ? 'desc' : 'asc'}`
      } else {
        request_string =
          request_string + `&sort=${sortCol},${sortType ? 'desc' : 'asc'}`
      }
    }
    if (search !== null) {
      request_string = request_string + `&search=${search}`
    } else {
      request_string = request_string + `&search=false`
    }

    return ApiManager.apiPost(
      `${inventoryManagementReq}/dualauthlist?${request_string}`,
      searchParam
    )
  }
}

export default new UserManagementService()
