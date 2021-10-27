const { API_MESSAGE_SUCCESS, HTTP_CODE_OK } = require('@lib/constants')

class BaseController {
    // Response data single 
    responseSingle = (data) => {
        return {
            code: HTTP_CODE_OK,
            data: data,
            message: API_MESSAGE_SUCCESS 
        }
    }

    // Response data collection (auto format paginate if determine)
    responseCollection = (collection, message = API_MESSAGE_SUCCESS) => {
        let data = {}

        // Check if was pagination
        if ('meta_data' in collection) {
            let metaData = collection.meta_data;

            data = {
                data: collection.data,
                total: metaData.total,
                per_page: metaData.per_page,
                current_page: metaData.current_page,
                total_pages: metaData.total_pages,
                prev_page: metaData.prev_page,
                next_page: metaData.next_page,
            }
        } 

        return {
            code: HTTP_CODE_OK,
            ...data,
            message: message /* Or optional success message */
        }
    }
}

module.exports = BaseController