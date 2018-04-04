// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from "react-intl";
import { Tooltip } from "react-tippy";

import './FontControls.css';

import { ReactComponent as BackgroundIcon } from "./blackwhite.svg";
import { ReactComponent as GlyphIcon } from "./glyph.svg";
import { ReactComponent as LowFontSizeIcon } from "./minus.svg";
import { ReactComponent as HighFontSizeIcon } from "./plus.svg";

const FontControls = props => (
    <div className="FontControls">
        <span className="font-size">
            <LowFontSizeIcon className="icon-lowFontSize" onClick={() => props.changeFontSize(20)} />
            <input
                type="range"
                min="20"
                max="140"
                step="2"
                value={props.fontSize}
                onChange={e =>
                    props.changeFontSize(e.target.value)
                }
            />
            <HighFontSizeIcon className="icon-highFontSize" onClick={() => props.changeFontSize(140)} />
        </span>
        {props.shouldShowTooltips ? (
            <span key="fontControlTooltip">
                <FormattedMessage
                    id="Shortcuts.blackOnWhiteAction"
                    defaultMessage="Press G key to toggle white on black mode"
                    description="Black on white mode - toggle"
                >
                    {text => (
                        <Tooltip
                            title={text}
                            position="left"
                            open={props.shouldShowTooltips}
                            arrow="true"
                            delay={600}
                        >
                            <BackgroundIcon
                                className="icon-background"
                                onClick={() => props.switchBlackOnWhite()}
                            />
                        </Tooltip>
                    )}
                </FormattedMessage>
                <FormattedMessage
                    id="Shortcuts.glyphAction"
                    defaultMessage="Press G key to toggle glyph mode"
                    description="Glyph mode - toggle"
                >
                    {text => (
                        <Tooltip
                            title={text}
                            position="bottom"
                            open={props.shouldShowTooltips}
                            arrow="true"
                            delay={600}
                        >
                            <GlyphIcon
                                className="icon-glyph"
                                onClick={() => props.switchGlyphMode()}
                            />
                        </Tooltip>
                    )}
                </FormattedMessage>
            </span>
        ) : (
                <span key="fontControl">
                    <FormattedMessage
                        id="StepView.blackOnWhiteTooltip"
                        defaultMessage="Toggle black on white mode"
                        description="Black on white mode - toggle"
                    >
                        {text => (
                            <Tooltip
                                title={text}
                                position="top"
                                trigger="mouseenter"
                                arrow="true"
                                delay={600}
                            >
                                <BackgroundIcon
                                    className="icon-background"
                                    onClick={() => props.switchBlackOnWhite()}
                                />
                            </Tooltip>
                        )}
                    </FormattedMessage>
                    <FormattedMessage
                        id="StepView.glyphTooltip"
                        defaultMessage="Toggle glyph mode"
                        description="Glyph mode - toggle"
                    >
                        {text => (
                            <Tooltip
                                title={text}
                                position="top"
                                trigger="mouseenter"
                                arrow="true"
                                delay={600}
                            >
                                <GlyphIcon
                                    className="icon-glyph"
                                    onClick={() => props.switchGlyphMode()}
                                />
                            </Tooltip>
                        )}
                    </FormattedMessage>
                </span>
            )}
    </div>
);

FontControls.propTypes = {
    shouldShowTooltips: PropTypes.bool.isRequired,
    switchBlackOnWhite: PropTypes.func.isRequired,
    changeFontSize: PropTypes.func.isRequired,
    switchGlyphMode: PropTypes.func.isRequired,
    fontSize: PropTypes.number.isRequired,
};

export default FontControls;