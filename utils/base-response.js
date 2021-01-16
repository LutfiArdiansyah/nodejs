class BaseResponse {
  constructor(message = null, data, error = false) {
    this.error = error;
    this.message = message;
    this.data = data;
  }
}

module.exports = BaseResponse;
