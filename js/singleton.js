export default class JsonRequestSingleton {
  constructor() {
    this.path = "http://localhost:3000";
  }
  static instance = null;
  static getInstance() {
    if (JsonRequestSingleton.instance === null) {
      JsonRequestSingleton.instance = new JsonRequestSingleton();
    }
    return JsonRequestSingleton.instance;
  }

  async getRequest(resource) {
    const res = await fetch(`${this.path}/${resource}`);
    const data = await res.json();
    return data;
  }

  async postRequest(body, resource) {
    console.log(resource);
    try {
      const res = await fetch(`${this.path}/${resource}`, {
        method: "POST",
        body,
        headers: { "content-type": "application/json" },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
