import React, { Component } from "react";
import "./Movie.css";

class Movie extends Component {
  editMovie(Mcid, category_list, index) {
    document.getElementById("wrapper").style.opacity = "1";
    document.getElementById("wrapper").style.visibility = "visible";

    document.getElementById("movImg").src =
      `http://${window.location.host}:${process.env.REACT_APP_API_PORT}/img/` +
      Mcid.image;

    document.getElementById("movTitle").value = Mcid.title;

    document.getElementById("movRating").value = Mcid.rating;

    document.getElementById("modify").value = Mcid.id;

    category_list.unshift(
      "<option name='" + Mcid.category + "'>" + Mcid.category + "</option>"
    );

    category_list = category_list.filter(
      (item, index) => category_list.indexOf(item) === index
    );

    document.getElementById("movCat").innerHTML = category_list;
  }

  deleteMovie(Mcid, index) {
    if (
      window.confirm(
        "Are you sure you want to delete " +
          Mcid.title +
          " from your Movie list ?"
      )
    ) {
      fetch(
        `http://${window.location.host}:${process.env.REACT_APP_API_PORT}/movies/` +
          Mcid.id,
        {
          method: "DELETE",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });

      let updated_list = this.state.items;

      if (index !== -1) {
        updated_list.splice(index, 1);
        this.setState({ items: updated_list });
      }
    } else {
      console.log("Thing was not saved to the database.");
    }
  }

  updateSB(event) {
    this.setState({
      searchTerm: event.target.value,
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      searchTerm: "",
    };
    this.updateSB = this.updateSB.bind(this);
  }

  async componentDidMount() {
    await fetch(
      `http://${window.location.host}:${process.env.REACT_APP_API_PORT}/movies`
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      });
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return (
        <React.Fragment>
          <div
            class="row justify-content-center"
            style={{ height: "50px", color: "white", marginTop: "340px" }}
          >
            <h1>Seems like your Back-End server is offline</h1>
          </div>
          <div class="row justify-content-center" style={{ height: "500px" }}>
            <img
              alt="Backend Server Offline"
              src="https://i.pinimg.com/originals/21/83/f3/2183f3dd15b25d1bfc923199e13f3ef6.png"
              style={{ height: "500px", width: "500px", marginTop: "190px" }}
            />
          </div>
        </React.Fragment>
      );
    } else {
      let category_list = [];
      items.forEach((item) =>
        category_list.push(
          "<option name='" + item.category + "'>" + item.category + "</option>"
        )
      );

      return (
        <React.Fragment>
          <div id="staticheadcontainer">
            <div class="row justify-content-center">
              <div id="NR" class="col-md-5">
                <h1 id="NRH1">New Releases</h1>
              </div>
            </div>

            <div class="row justify-content-center">
              <div id="colSB" class="col-md-5">
                <form class="form-inline my-2 my-lg-0 justify-content-center">
                  <div id="Shere">
                    <input
                      type="text"
                      placeholder={this.state.searchTerm}
                      onChange={this.updateSB}
                    />
                    <button class="btn btn-primary my-2 my-sm-0" type="submit">
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div id="rowBigC">
            <div class="row justify-content-center" id="Row">
              {items
                .filter((item) => {
                  if (this.state.searchTerm == "") {
                    return item;
                  } else if (
                    item.title
                      .toLowerCase()
                      .includes(this.state.searchTerm.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .map((items, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundImage: `url(http://${window.location.host}:${process.env.REACT_APP_API_PORT}/img/${items.image})`,
                    }}
                    class={items.category + " MoviePoster"}
                    id={items.id}
                  >
                    <div class="Ratings">{items.rating}</div>
                    <i
                      class="fas fa-times Mdelete"
                      id={"D" + items.id}
                      onClick={this.deleteMovie.bind(this, items, index)}
                    ></i>
                    <div
                      class="MovieContainer"
                      id={"MC" + items.id}
                      onClick={this.editMovie.bind(
                        this,
                        items,
                        category_list,
                        index
                      )}
                    >
                      <i class="fas fa-edit Medit"></i>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}
export default Movie;
