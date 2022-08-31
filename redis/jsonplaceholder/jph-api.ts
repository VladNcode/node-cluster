import axios from "axios";

class JPHAPI {
  async fetchUsers() {
    return (await axios.get("https://jsonplaceholder.typicode.com/users")).data;
  }

  async fetchPosts() {
    return (await axios.get("https://jsonplaceholder.typicode.com/posts")).data;
  }

  async fetchComments() {
    return (await axios.get("https://jsonplaceholder.typicode.com/comments"))
      .data;
  }
}

export = new JPHAPI();
