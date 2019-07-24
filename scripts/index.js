document.addEventListener("DOMContentLoaded", function() {
  const validInput = (key, val) => {
    let re = new RegExp(".*");
    if (key === "name") re = /^[a-zA-Z]+$/;
    else if (key === "email")
      re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    else if (key === "phone") re = /^[0-9]+$/;
    return re.test(val) ? "" : `${key} is invalid`;
  };
  document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();
    let error = {
      common: "",
      name: "",
      email: "",
      phone: "",
      subscription: ""
    };
    const data = {
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
      subscription: this.subscribe.checked
    };
    if (
      Object.values(data).every(x =>
        typeof x === "boolean" ? true : x.length > 0
      )
    ) {
      error.common = "";
      Object.keys(data).forEach(x => {
        error[x] = validInput(x, data[x]);
      });
    } else {
      error = {
        common: "All the fields should be filled",
        name: "",
        email: "",
        phone: "",
        subscription: ""
      };
    }
    Object.keys(error).forEach(err => {
      if (err !== "subscription") {
        document.getElementsByClassName(`${err}`)[0].innerHTML = error[
          err
        ].toUpperCase();
      }
    });
    let isValid = Object.values(error).every(x => x === "");
    if (isValid) {
      let loader = document.getElementsByClassName("loader")[0];
      loader.style.display = "block";
      fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
        .then(response => response.json())
        .then(json => {
          loader.style.display = "none";
          json.map(item => {
            let title = document.createElement("p");
            title.setAttribute("class", "title");
            title.innerHTML = item.title;
            let body = document.createElement("p");
            body.setAttribute("class", "body");
            body.innerHTML = item.body;
            document.getElementById("posts").appendChild(title);
            document.getElementById("posts").appendChild(body);
          });
        });
      console.log(data);
    }
  });
});
