import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  updateTextToRead,
  updateTextReaded,
  updateInterimText
} from '../actions/texts-actions';
import {
  updateLang,
  toggleDisplayTextReadedBox
} from '../actions/settings-actions';
import {
  scoreSelector,
  textReadedFeedbackSelector
} from '../selectors/results-selectors';
import { updateTalking } from '../actions/recognition-actions';
import App from '../components/app'

const mapStateToProps = (state, ownProps) => {
  return {
    textToRead: state.texts.textToRead,
    textReaded: state.texts.textReaded,
    interimText: state.texts.interimText,
    score: scoreSelector(state),
    textReadedFeedback: textReadedFeedbackSelector(state),
    lang: state.settings.lang,
    displayTextReadedBox: state.settings.displayTextReadedBox,
    talking: state.recognition.talking 
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onUpdateTextToRead: bindActionCreators(updateTextToRead, dispatch),
    onUpdateTextReaded: bindActionCreators(updateTextReaded, dispatch),
    onUpdateInterimText: bindActionCreators(updateInterimText, dispatch),
    onUpdateLang: bindActionCreators(updateLang, dispatch),
    toggleDisplayTextReadedBox: bindActionCreators(toggleDisplayTextReadedBox, dispatch),
    onUpdateTalking: bindActionCreators(updateTalking, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)