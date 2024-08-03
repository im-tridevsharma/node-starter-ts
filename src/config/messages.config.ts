const messages = {
  app: {
    all_ok: "Server is working fine!",
    errors: {
      csrf_token_error: "Please check your CSRF token, It is invalid.",
      page_not_found:
        "The requested resource is not available! Please check your endpoint.",
      internal_server_error: "Something went wrong! Please try again later."
    },
  },

  //welcome message
  welcome: {
    hello: "Hello from welcome routes!"
  }
};

export default messages;
