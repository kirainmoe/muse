import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { observer } from 'mobx-react';
// Utils
import { getRect, i18n } from '../utils';
// config
import config from '../config/base';

@observer
export default class MenuContainer extends Component {
  id = undefined;

  static propTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.id = props.id;
  }

  /* life cycles */
  componentDidMount() {
    this.volume.addEventListener('click', this.onVolumeContainerClick);

    this.increaseOffset.addEventListener('click', this.onIncreaseOffsetClick);
    this.decreaseOffset.addEventListener('click', this.onDecreaseOffsetClick);
    this.increasePlayRate.addEventListener(
      'click',
      this.onIncreasePlayRateClick
    );
    this.decreasePlayRate.addEventListener(
      'click',
      this.onDecreasePlayRateClick
    );
  }
  componentWillUnmount() {
    this.volume.removeEventListener('click', this.onVolumeContainerClick);

    this.increaseOffset.removeEventListener(
      'click',
      this.onIncreaseOffsetClick
    );
    this.decreaseOffset.removeEventListener(
      'click',
      this.onDecreaseOffsetClick
    );

    this.increasePlayRate.removeEventListener(
      'click',
      this.onIncreasePlayRateClick
    );
    this.decreasePlayRate.removeEventListener(
      'click',
      this.onDecreasePlayRateClick
    );
  }

  /* event listeners */
  onLoopTogglerClick = e => {
    e.stopPropagation();
    const { store } = this.props;
    store.toggleLoop();
  };

  onFullscreenTogglerClick = e => {
    e.stopPropagation();
    const { store, parent } = this.props;

    // firefox compatibility
    if (parent.player.mozRequestFullScreen) {
      parent.getFullscreenState()
        ? document.mozCancelFullScreen()
        : parent.player.mozRequestFullScreen();
    }

    store.toggleFullscreen();
  };

  onVolumeContainerClick = e => {
    e.preventDefault();
    e.stopPropagation();
    const rect = getRect(this.volume),
      { store } = this.props,
      vol = (e.clientX - rect.left) / this.volume.offsetWidth;
    store.slideVolume(vol > 1 ? 1 : vol);
  };

  onIncreaseOffsetClick = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.store.setLyricOffset(0.5);
  };

  onDecreaseOffsetClick = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.store.setLyricOffset(-0.5);
  };

  onIncreasePlayRateClick = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.store.setPlayRate(0.1);
  };

  onDecreasePlayRateClick = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.store.setPlayRate(-0.1);
  };

  onStopClick = e => {
    const { store } = this.props;
    e.preventDefault();
    e.stopPropagation();
    store.playerStop();
  };

  onDebugModeTogglerClick = () => {
    const { parent } = this.props;
    if (confirm(i18n('devModeAlert'))) {
      parent.player.removeEventListener(
        'contextmenu',
        parent.onPlayerContextMenu
      );
    }
  };

  render() {
    const {
      isMenuOpen,
      isLoop,
      isFullscreen,
      volume,
      playRate,
      offset,
      parent
    } = this.props.store;

    return (
      <div
        className={'muse-menu' + (!isMenuOpen ? ' muse-menu__state-close' : '')}
      >
        <div
          className={'muse-menu__item'}
          name={'stop'}
          onClick={this.onStopClick}
        >
          <span>{i18n('stop')}</span>
        </div>
        <div className={'muse-menu__item'} name={'slide-volume'}>
          <div>{i18n('modulation')}</div>
          <div className={'muse-volume'}>
            <div
              className={'muse-volume__container'}
              ref={ref => (this.volume = ref)}
            >
              <div
                className={'muse-volume__current'}
                style={{
                  width: Number(volume / 1 * 100) + '%'
                }}
              >
                <span
                  className="muse-volume__handle"
                  ref={ref => (this.volumeHanler = ref)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={'muse-menu__item'} name={'fix-lyric-offset'}>
          <div>
            {i18n('setLyricOffset')}({i18n('currentLyricOffset')}:{offset}s)
          </div>
          <div className={'muse-menu__offset'}>
            <span ref={ref => (this.increaseOffset = ref)}>
              + {i18n('forward')} 0.5s
            </span>

            <span ref={ref => (this.decreaseOffset = ref)}>
              - {i18n('backward')} 0.5s
            </span>
          </div>
        </div>

        <div className={'muse-menu__item'} name={'set-play-rate'}>
          <span>{i18n('playRate')}(x {playRate})</span>
          <span className={'muse-menu__playrate-container'}>
            <a
              href={'#'}
              name={'increasePlayRate'}
              ref={ref => (this.increasePlayRate = ref)}
              className={playRate >= 3.9 ? 'muse-menu__playrate-disabled' : ''}
            >
              +
            </a>
            <a
              href={'#'}
              name={'decreasePlayRate'}
              ref={ref => (this.decreasePlayRate = ref)}
              className={playRate <= 0.1 ? 'muse-menu__playrate-disabled' : ''}
            >
              -
            </a>
          </span>
        </div>

        <div
          className={'muse-menu__item'}
          name={'toggle-loop'}
          onClick={this.onLoopTogglerClick}
        >
          <span>
            {i18n('looping')}：{isLoop ? i18n('enabled') : i18n('disabled')}
          </span>
        </div>

        <div
          className={'muse-menu__item'}
          name={'toggle-fullscreen'}
          onClick={this.onFullscreenTogglerClick}
        >
          <span>
            {isFullscreen ? i18n('exit') : ''}
            {i18n('fullscreenMode')}
          </span>
        </div>

        <div
          className={'muse-menu__item'}
          name={'toggle-debug-mode'}
          onClick={this.onDebugModeTogglerClick}
        >
          <span>{i18n('devMode')}</span>
        </div>

        <div
          className={'muse-menu__item'}
          onClick={() => {
            window.open('https://github.com/moefront/muse');
          }}
        >
          <span>
            {config.MUSE_VERSION != parent.latest
              ? i18n('updateAvailable') + '：MUSE ' + parent.latest
              : 'MUSE Player ver.' + config.MUSE_VERSION}
          </span>
        </div>
      </div>
    );
  }
}