import React, { Component } from 'react';
import './index.css';
import Slides from './Slides';
import Toolbox from './Toolbox';
import uuid from 'uuid/v1';
import DndWorkspace from './DndWorkspace';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import {
  setCurrentDeck,
  updateSlidesToDeck,
  fetchUserDeck,
  setDeckId,
  fetchUser
} from '../../actions/userStateActions';
import Loader from '../loading/loading';
import firebase from '../fibebase';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspace: [], //Array of blocks for current slide.
      slides: [],
      currentSlideId: -1,
      block: null,
      blockTextContent: '',
      idDeck: -1,
      showEditor: false,
      currentWorkingSlide: {},
      file: 'https://picsum.photos/200/300',
      filesToUpload: [],
      isUploadingFiles: false
    };
  }

  async componentDidMount() {
    // When Refreshed Id will be set.
    if (
      this.props.currentWorkingDeckId === '' &&
      this.props.currentWorkingDeckId !== this.props.match.params.idDeck
    ) {
      // console.log('Component Did mount setDeck');
      this.props.setDeckId(this.props.match.params.idDeck);
    }

    // When User choose Deck to Edit
    if (this.props.currentWorkingDeckId !== '') {
      // console.log('current deck set');
      if (
        Object.keys(this.props.currentWorkingDeck).length !== 0 ||
        this.props.currentWorkingDeck.idDeck !== this.props.match.params.idDeck
      ) {
        // console.log('inside setDeck');
        const currentDeck = this.props.userdecks.filter(
          (deck) => deck.idDeck === this.props.currentWorkingDeckId
        )[0];
        this.props.setCurrentDeck(currentDeck);
      } else {
        const slides = [...this.props.currentWorkingDeck.slides];
        this.setState({
          idDeck: this.props.currentWorkingDeckId,
          slides: slides,
          workspace: this.props.currentWorkingDeck.slides[0].blocks,
          currentSlideId: this.props.currentWorkingDeck.slides[0].idSlide,
          showEditor: true,
          currentWorkingSlide: slides[0]
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Fetch User on Refresh once DeckId is updated on Mount.
    // 2nd Condition: will handle redirecting from dashboard upon create NewDeck.
    // console.log('prevProps', prevProps, 'this.props', this.props);
    if (
      prevProps.currentWorkingDeckId !== this.props.currentWorkingDeckId ||
      (this.props.currentWorkingDeck === undefined &&
        this.props.currentWorkingDeckId !== undefined)
    ) {
      this.props.fetchUserDeck(this.props.currentWorkingDeckId);
    }

    // If the user redirected by clicking Edit, Above condition handles fetching deck
    // and this will set the slides in Local State after getting deck details.
    if (
      prevProps.currentWorkingDeck !== this.props.currentWorkingDeck &&
      this.props.currentWorkingDeck !== undefined
    ) {
      // console.log('In Update', this.props.currentWorkingDeck);
      const slides = [...this.props.currentWorkingDeck.slides];

      // Check if Its a new Deck, Update Id of Current Working Deck.
      if (slides[0].idDeck !== this.props.currentWorkingDeckId) {
        slides[0].idDeck = this.props.currentWorkingDeckId;
      }

      this.setState({
        idDeck: this.props.currentWorkingDeckId,
        slides: slides,
        workspace: [...this.props.currentWorkingDeck.slides[0].blocks],
        currentSlideId: this.props.currentWorkingDeck.slides[0].idSlide,
        showEditor: true,
        currentWorkingSlide: slides[0]
      });
    }

    // Upon loading new image into state.file add a new block to workspace
    if (prevState.file !== this.state.file) {
      const defaultImage = {
        id: uuid(),
        top: 200,
        left: 100,
        type: 'image',
        width: 200,
        height: 200,
        // url: 'https://picsum.photos/200/300',
        url: this.state.file
      };
      this.setState({ workspace: [...this.state.workspace, defaultImage] });
    }
  }

  handleSlideSelection = (e, slideId) => {
    e.preventDefault();
    // console.log('Called handleSlideSelection', this.state.currentSlideId);
    // setState({backcol=reqcol})

    const blocks = this.state.slides.filter(
      (slide) => slide.idSlide === slideId
    )[0].blocks;
    const slide = this.state.slides.filter(
      (slide) => slide.idSlide === slideId
    );
    this.setState({
      workspace: blocks,
      currentSlideId: slideId,
      currentWorkingSlide: slide[0],
      block: null
    });
  };

  handleAddTextBox = () => {
    const newTextElement = {
      id: uuid(),
      type: 'text',
      value: 'Hello world!',
      format: 'p',
      textAlign: 'left',
      top: 200,
      left: 100,
      color: 'black',
      backgroundColor: 'transparent'
    };
    const blocks = [...this.state.workspace, newTextElement];
    this.setState({ workspace: blocks });
  };

  // Function to upload images in slide.
  uploadImagesPromise() {
    const promiseList = [];
    this.state.workspace
      .filter(
        (block) =>
          block.type === 'image' &&
          !block.url.includes('https://firebasestorage.googleapis.com')
      )
      .forEach(async (block) => {
        // Need to upload the Images if the block is image.
        console.log(this.state.filesToUpload, block);
        const imageToUpload = this.state.filesToUpload.filter(
          (imageBlock) => imageBlock.localURL === block.url
        );
        console.log('uploading image....', block, imageToUpload);
        if (imageToUpload.length === 1) {
          // uploadedImageURL[block.id] = await firebase.uploadImage(
          //   imageToUpload[0],
          // );
          promiseList.push(firebase.uploadImage(imageToUpload[0]));
        }
      });
    return Promise.all(promiseList);
  }

  handleSaveSlide = () => {
    const slides = [...this.state.slides];

    const slideIndex = slides.findIndex(
      (slide) => slide.idSlide === this.state.currentSlideId
    );

    // Upload the images onClick Save slide.
    let workspace = [];
    this.setState({ isUploadingFiles: true });
    this.uploadImagesPromise().then((results) => {
      console.log('Promise all results', results);
      let index = 0;
      workspace = this.state.workspace.map((block) => {
        if (
          block.type === 'image' &&
          !block.url.includes('https://firebasestorage.googleapis.com')
        ) {
          block.url = results[index++];
          console.log('Image Block', block);
        }
        return block;
      });
      console.log('Workspace ::', workspace);
      slides[slideIndex].blocks = workspace;
      // console.log('Save Slide', slides, index);
      this.setState({ slides, isUploadingFiles: false });
    });
    // slides[index].blocks = this.state.workspace;
  };

  handleBlockMove = (blockDetails) => {
    // console.log(blockDetails);
    let currentWorkspace = [...this.state.workspace];
    const blockIndex = currentWorkspace.findIndex(
      (block) => block.id === blockDetails.id
    );
    let updateBlock = currentWorkspace[blockIndex];
    updateBlock.top = blockDetails.top;
    updateBlock.left = blockDetails.left;
    currentWorkspace[blockIndex] = updateBlock;
    // console.log(currentWorkspace);
    this.setState({ workspace: currentWorkspace });
  };

  handleDoubleClick = (e, block) => {
    // console.log('Calling double click', block);
    this.setState({ block: block, blockTextContent: block.value });
  };

  handleChangeStyle = (styleProp) => {
    // console.log('styles to update', styleProp);
    let currentWorkspace = [...this.state.workspace];
    const blockIndex = currentWorkspace.findIndex(
      (block) => block.id === this.state.block.id
    );
    let updateBlock = currentWorkspace[blockIndex];
    updateBlock[styleProp.property] = styleProp.value;
    currentWorkspace[blockIndex] = updateBlock;
    // console.log(currentWorkspace);
    this.setState({ workspace: currentWorkspace });
  };

  handleApplyStyle = () => {
    // console.log('disable the style panel and Save Text.');
    let currentWorkspace = [...this.state.workspace];
    const blockIndex = currentWorkspace.findIndex(
      (block) => block.id === this.state.block.id
    );
    let updateBlock = currentWorkspace[blockIndex];
    updateBlock.value = this.state.blockTextContent;
    currentWorkspace[blockIndex] = updateBlock;
    // removing block: null as of now it will be handled by containerBodyClick
    this.setState({ workspace: currentWorkspace });
  };

  handleAddSlide = () => {
    const defaultSlide = {
      idSlide: uuid(),
      idDeck: this.state.idDeck,
      position: this.state.slides.length + 1,
      backgroundColor: 'white',
      blocks: [
        {
          id: uuid(),
          type: 'text',
          value: 'Hello world Slide!',
          format: 'h2',
          top: 100,
          left: 120,
          textAlign: 'center',
          color: 'black',
          backgroundColor: 'transparent'
        }
      ]
    };
    this.setState({
      slides: [...this.state.slides, defaultSlide],
      block: null
    });
  };

  handleInputChange = (e) => {
    this.setState({ blockTextContent: e.target.value });
  };

  handleSaveDeck = (e) => {
    // console.log('Save Deck', this.state, this.props.currentWorkingDeck);
    this.props.updateSlidesToDeck(
      this.state.slides,
      this.props.currentWorkingDeck
    );
  };

  handleDashboardNav = (e) => {
    // console.log('user Deatil while moving to dashboard:', this.props.user);
    this.props.history.replace(
      '/' + this.props.match.params.uid + '/dashboard'
    );
  };

  handleContainerClick = (e) => {
    // console.log('disable the style panel and Save Text.');
    if (this.state.block !== null) {
      let currentWorkspace = [...this.state.workspace];
      const blockIndex = currentWorkspace.findIndex(
        (block) => block.id === this.state.block.id
      );
      let updateBlock = currentWorkspace[blockIndex];
      updateBlock.value = this.state.blockTextContent;
      currentWorkspace[blockIndex] = updateBlock;

      this.setState({ workspace: currentWorkspace });
    }
  };

  handleColorPick = (color, colorType) => {
    // console.log('Color picker', color);
    if (colorType === 'slideColor') {
      let selectedSlide = this.state.slides.filter(
        (slide) => slide.idSlide === this.state.currentSlideId
      );
      selectedSlide[0]['backgroundColor'] = color;
      let updatedSlides = this.state.slides.map((slide) => {
        if (selectedSlide[0].idSlide === slide.idSlide) {
          return selectedSlide[0];
        } else {
          return slide;
        }
      });
      this.setState({ slides: updatedSlides });
    } else {
      let currentWorkspace = [...this.state.workspace];
      const blockIndex = currentWorkspace.findIndex(
        (block) => block.id === this.state.block.id
      );
      let updateBlock = currentWorkspace[blockIndex];

      if (colorType === 'textColor') {
        updateBlock.color = color;
      } else if (colorType === 'backgroundColor') {
        updateBlock.backgroundColor = color;
      }
      currentWorkspace[blockIndex] = updateBlock;
      // console.log(currentWorkspace);
      this.setState({ workspace: currentWorkspace });
    }
  };

  handleDeleteBlock = (dropBlock) => {
    // console.log('Deleting the Block', dropBlock);
    let currentWorkspace = [...this.state.workspace];
    const updateWorkspace = currentWorkspace.filter(
      (block) => block.id !== dropBlock.id
    );
    this.setState({ workspace: updateWorkspace });
  };

  handleDeleteSlide = () => {
    // console.log('Delete the slide');
    let deleteSlideIndex = null;
    const slides = this.state.slides.filter((slide, index) => {
      if (slide.idSlide === this.state.currentSlideId) {
        deleteSlideIndex = index;
      }
      return slide.idSlide !== this.state.currentSlideId;
    });

    if (deleteSlideIndex !== 0) {
      this.setState({
        slides,
        workspace: slides[deleteSlideIndex - 1].blocks,
        currentSlideId: slides[deleteSlideIndex - 1].idSlide
      });
    } else {
      if (deleteSlideIndex === 0 && slides.length >= 1) {
        this.setState({
          slides,
          workspace: slides[0].blocks,
          currentSlideId: slides[0].idSlide
        });
      } else {
        // console.log('cannot delete Single slide');
      }
    }
  };

  handleContainerBodyClick = (e) => {
    console.log('Container body Clicked', e.target);
    if (e.target.id !== 'dragBox' && e.target.id !== 'dragInput') {
      this.setState({ block: null });
    }
  };

  handleImageChange = (e) => {
    const files = e.target.files;
    const fileDetail = files.item(0);
    const fileURL = URL.createObjectURL(e.target.files[0]);
    fileDetail.localURL = fileURL;
    this.setState({
      file: fileURL,
      filesToUpload: [...this.state.filesToUpload, fileDetail]
    });
  };

  // Handler for Image size change (Width/Height)
  handleImageSizeChange = (e) => {
    // update image dimensions.
    let workspace = [...this.state.workspace];
    let blockToUpdate = { ...this.state.block };

    if (e.target.name === 'imageWidth') {
      console.log('Image width Changed to', e.target.value);
      if (!('height' in blockToUpdate)) {
        blockToUpdate.height = 200;
      }
      blockToUpdate.width = e.target.value > 700 ? 700 : e.target.value;
    }
    if (e.target.name === 'imageHeight') {
      console.log('Image heigth changed to :', e.target.value);
      if (!('width' in blockToUpdate)) {
        blockToUpdate.width = 200;
      }
      blockToUpdate.height = e.target.value > 500 ? 500 : e.target.value;
    }

    const blockIndex = workspace.findIndex(
      (block) => block.id === blockToUpdate.id
    );

    console.log('index', blockToUpdate, this.state.block);
    workspace[blockIndex] = blockToUpdate;

    this.setState({ workspace, block: blockToUpdate });
  };

  render() {
    let slide = this.state.slides.filter(
      (slide) => slide.idSlide === this.state.currentSlideId
    );
    // console.log(this.state.currentSlideId);
    // console.clear();
    // console.log(slide[0]);
    return this.state.showEditor === true ? (
      <div className="edit-container row">
        <div className="col-sm-2" style={{ padding: '0' }}>
          <Slides
            currentSlideId={this.state.currentSlideId}
            onAddSlide={this.handleAddSlide}
            fetchSlides={this.state.slides}
            onSlideSelection={this.handleSlideSelection}
          />
        </div>
        <div className="workspace col-sm-7">
          {/* <Workspace workspace={this.state.workspace} /> */}
          <DndProvider backend={HTML5Backend}>
            <DndWorkspace
              workspace={this.state.workspace}
              onBlockMove={this.handleBlockMove}
              onDoubleClickEvent={this.handleDoubleClick}
              onInputChange={this.handleInputChange}
              onContainerClick={this.handleContainerClick}
              onDeleteBlock={this.handleDeleteBlock}
              slide={slide[0]}
              onContainerBodyClicked={this.handleContainerBodyClick}
            />
          </DndProvider>
        </div>
        <div className="toolbox col-sm-3">
          <Toolbox
            block={this.state.block}
            slides={this.state.slides}
            isUploadingFiles={this.state.isUploadingFiles}
            onChangeStyle={this.handleChangeStyle}
            onAddTextBox={this.handleAddTextBox}
            onSaveSlide={this.handleSaveSlide}
            onApplyStyle={this.handleApplyStyle}
            onSaveDeck={this.handleSaveDeck}
            onDashBoardNavigation={this.handleDashboardNav}
            onColorPick={this.handleColorPick}
            onDeleteSlide={this.handleDeleteSlide}
            slide={this.state.currentWorkingSlide}
            onImageChange={this.handleImageChange}
            onImageSizeChange={this.handleImageSizeChange}
          />
        </div>
      </div>
    ) : (
      <div className="editor-loader">
        <Loader></Loader>
      </div>
    );
  }
}
// export default Edit;

const mapStateToProps = (state) => ({
  user: state.user.user,
  userdecks: state.user.userdecks,
  currentWorkingDeckId: state.user.currentWorkingDeckId,
  currentWorkingDeck: state.user.currentWorkingDeck
});

export default connect(
  mapStateToProps,
  {
    setCurrentDeck,
    updateSlidesToDeck,
    fetchUserDeck,
    setDeckId,
    fetchUser
  }
)(Edit);
