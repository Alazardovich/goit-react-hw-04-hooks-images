/* eslint-disable no-unused-expressions */
/* eslint-disable no-labels */
/* eslint-disable no-undef */
import "./App.css";
import { useState, useEffect } from "react";
// import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "./components/Searchbar/SeachBar";
import Modal from "./components/Modal/Modal";
import ImageGallery from "./components/ImageGallery/ImageGalery";
import LoadButton from "./components/Button/LoadButton";
import Loading from "./components/Loader/Loader";
import imagesFetch from "../src/utils/apiFetch";
// import { ReactComponent as IconButton } from "../src/icons/loading-svgrepo-com.svg";

const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectImages, setSelectedImages] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageCounter, setPageCounter] = useState(1);

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    // if (searchQuery && !pageCounter) {
    fetchImages();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageCounter]);
  function onSearchQuery(searchQuery) {
    setSearchQuery(searchQuery);
    setImages([]);
    setPageCounter(1);
    setError(null);
  }
  const fetchImages = () => {
    const options = { searchQuery, pageCounter };
    setLoading(true);

    imagesFetch
      .getFetch(options)
      .then(
        (hits) => setImages((state) => [...state, ...hits])
        // this.setState((prevState) => ({
        //   images: [...prevState.images, ...hits],
        //   // pageCounter: prevState.pageCounter + 1,
        // }))
      )
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  };
  const onChangeCounter = () => {
    return setPageCounter((state) => state + 1);
  };

  const toggleModal = (selectImages, selectAlt) => {
    setShowModal((state) => !state);
    setSelectedImages(selectImages, selectAlt);
  };

  const showButtonLoad = images.length > 0 && !isLoading;
  return (
    <>
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      <SearchBar onSubmit={onSearchQuery} query={searchQuery} />

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={selectImages} alt={""} width="900" height="600" />
        </Modal>
      )}

      {isLoading && <Loading />}
      <ImageGallery images={images} onToggleModal={toggleModal} />
      {showButtonLoad && (
        <LoadButton onClick={onChangeCounter} aria-label="Loading">
          Download Images?
        </LoadButton>
      )}
      <ToastContainer autoClose={3000} theme="colored" />
    </>
  );
};

// class App extends Component {
//   state = {
//     images: [],
//     searchQuery: null,
//     showModal: false,
//     selectImage: {},
//     isLoading: false,
//     error: null,
//     pageCounter: 1,
//   };

//   async componentDidUpdate(_, prevState) {
//     if (prevState.searchQuery !== this.state.searchQuery) {
//       this.fetchImages();
//     }
//     if (
//       prevState.searchQuery === this.state.searchQuery &&
//       prevState.pageCounter !== this.state.pageCounter
//     ) {
//       this.fetchImages();
//     }
//   }

//   setSearchQuery = (searchQuery) => {
//     this.setState({ searchQuery, pageCounter: 1, images: [], error: null });
//     // console.log(this.state.searchQuery);
//   };
//   fetchImages = () => {
//     const { searchQuery, pageCounter } = this.state;
//     const options = { searchQuery, pageCounter };
//     this.setState({ isLoading: true });
//     imagesFetch
//       .getFetch(options)
//       .then((hits) =>
//         this.setState((prevState) => ({
//           images: [...prevState.images, ...hits],
//           // pageCounter: prevState.pageCounter + 1,
//         }))
//       )
//       .catch((error) => {
//         this.setState(error);
//       })
//       .finally(() => this.setState({ isLoading: false }));
//     console.log("button:", this.state.images);
//   };
//   onChangeCounter = () =>
//     this.setState((prevState) => ({
//       pageCounter: prevState.pageCounter + 1,
//     }));

//   toggleModal = (url, alt) => {
//     this.setState((prevState) => ({
//       showModal: !prevState.showModal,
//       selectImage: { url, alt },
//     }));
//   };

//   render() {
//     const {
//       showModal,
//       error,
//       images,
//       isLoading,
//       searchQuery,
//       selectImage: { url, alt },
//     } = this.state;
//     const showButtonLoad = images.length > 0 && !isLoading;
//     return (
//       <>
//         {error && <p>Whoops, something went wrong: {error.message}</p>}
//         <SearchBar onSubmit={this.setSearchQuery} query={searchQuery} />

//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img src={url} alt={alt} width="900" height="600" />
//           </Modal>
//         )}

//         {isLoading && <Loading />}
//         <ImageGallery images={images} onToggleModal={this.toggleModal} />
//         {showButtonLoad && (
//           <LoadButton onClick={this.onChangeCounter} aria-label="Loading">
//             Download Images?
//           </LoadButton>
//         )}
//         <ToastContainer autoClose={3000} theme="colored" />
//       </>
//     );
//   }
// }

export default App;
