import React, { Component } from 'react';
import { ShareButtons,  generateShareIcon } from 'react-share';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import PropTypes from 'prop-types';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');
const VKIcon = generateShareIcon('vk');
const OKIcon = generateShareIcon('ok');
const TelegramIcon = generateShareIcon('telegram');
const WhatsappIcon = generateShareIcon('whatsapp');
const RedditIcon = generateShareIcon('reddit');

const styleSheet = createStyleSheet('Share', theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1em 0',
    flexWrap: 'wrap'
  },
  button: {
    cursor: 'pointer',
    margin: '0.5em'
  }
}));


class Share extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
  };

  render() {
    const classes = this.props.classes;
    const shareUrl = window.location.href;
    const picture = `${String(window.location)}/share.png`;

    return (
      <div className={classes.buttons}>
        <FacebookShareButton
          url={shareUrl}
          title={this.props.title}
          picture={picture}
          className={`shareButton ${classes.button}`}>
          <FacebookIcon
            size={32}
            round />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={this.props.title}
          className={`shareButton ${classes.button}`}>
          <TwitterIcon
            size={32}
            round />
        </TwitterShareButton>

        <TelegramShareButton
          url={shareUrl}
          title={this.props.title}
          className={`shareButton ${classes.button}`}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={this.props.title}
          separator=' :: '
          className={`shareButton ${classes.button}`}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>

        <GooglePlusShareButton
          url={shareUrl}
          className={`shareButton ${classes.button}`}>
          <GooglePlusIcon
            size={32}
            round />
        </GooglePlusShareButton>

        <LinkedinShareButton
          url={shareUrl}
          title={this.props.title}
          windowWidth={750}
          windowHeight={600}
          className={`shareButton ${classes.button}`}>
          <LinkedinIcon
            size={32}
            round />
        </LinkedinShareButton>

        <PinterestShareButton
          url={shareUrl}
          media={picture}
          windowWidth={1000}
          windowHeight={730}
          className={`shareButton ${classes.button}`}>
          <PinterestIcon size={32} round />
        </PinterestShareButton>

        <VKShareButton
          url={shareUrl}
          image={picture}
          windowWidth={660}
          windowHeight={460}
          className={`shareButton ${classes.button}`}>
          <VKIcon
            size={32}
            round />
        </VKShareButton>

        <OKShareButton
          url={shareUrl}
          image={picture}
          windowWidth={660}
          windowHeight={460}
          className={`shareButton ${classes.button}`}>
          <OKIcon
            size={32}
            round />
        </OKShareButton>

        <RedditShareButton
          url={shareUrl}
          title={this.props.title}
          windowWidth={660}
          windowHeight={460}
          className={`shareButton ${classes.button}`}>
          <RedditIcon
            size={32}
            round />
        </RedditShareButton>
      </div>
    );
  }
}

export default withStyles(styleSheet)(Share);