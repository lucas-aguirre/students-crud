class JsonHelper
{
    jsonResponse = (status, message, result = null) => {
        return {
            status,
            message,
            result
        }
    }
}

module.exports = new JsonHelper();