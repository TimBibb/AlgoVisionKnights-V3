import React from 'react'
import { SketchPicker } from 'react-color'
import reactCSS from 'reactcss'
import {Typography} from '@material-ui/core';
import './Settings.css';

function NavigateToDashboard(){
	window.location.href = "/";
}

function defaultColors(){
    // default primaryColor
    localStorage.setItem('primaryColor', '#FFFFFF')
    localStorage.setItem('primaryColorR', '255')
    localStorage.setItem('primaryColorG', '255')
    localStorage.setItem('primaryColorB', '255')
    // default secondaryColor
    localStorage.setItem('secondaryColor', '#404243')
    localStorage.setItem('secondaryColorR', '64')
    localStorage.setItem('secondaryColorG', '66')
    localStorage.setItem('secondaryColorB', '67')
    // default accentColor
    localStorage.setItem('accentColor', '#FFC904')
    localStorage.setItem('accentColorR', '255')
    localStorage.setItem('accentColorG', '201')
    localStorage.setItem('accentColorB', '4')
    // default backgroundColor
    localStorage.setItem('backgroundColor', '#000000')
    localStorage.setItem('backgroundColorR', '0')
    localStorage.setItem('backgroundColorG', '0')
    localStorage.setItem('backgroundColorB', '0')
    // default cardColor
    localStorage.setItem('cardColor', '#181818')
    localStorage.setItem('cardColorR', '24')
    localStorage.setItem('cardColorG', '24')
    localStorage.setItem('cardColorB', '24')
    // default nodeColor
    localStorage.setItem('nodeColor', '#1B203D')
    localStorage.setItem('nodeColorR', '27')
    localStorage.setItem('nodeColorG', '32')
    localStorage.setItem('nodeColorB', '61')

    window.location.reload(false);
}

class Settings extends React.Component {
    
    // primaryColor = localStorage.getItem('primaryColor') ? localStorage.getItem('primaryColor') : "#FFFFFF"
    // secondaryColor = localStorage.getItem('secondaryColor') ? localStorage.getItem('secondaryColor') : GRAYBLACK
    // backgroundColor = localStorage.getItem('backgroundColor') ? localStorage.getItem('backgroundColor') : "#000000"
    // accentColor = localStorage.getItem('accentColor') ? localStorage.getItem('accentColor') : UCF_GOLD

    state = {
        primaryColor: {
            r: localStorage.getItem('primaryColorR'),
            g: localStorage.getItem('primaryColorG'),
            b: localStorage.getItem('primaryColorB'),
            a: '1',
        },
        secondaryColor: {
            r: localStorage.getItem('secondaryColorR'),
            g: localStorage.getItem('secondaryColorG'),
            b: localStorage.getItem('secondaryColorB'),
            a: '1',
        },
        accentColor: {
            r: localStorage.getItem('accentColorR'),
            g: localStorage.getItem('accentColorG'),
            b: localStorage.getItem('accentColorB'),
            a: '1',
        },
        backgroundColor: {
            r: localStorage.getItem('backgroundColorR'),
            g: localStorage.getItem('backgroundColorG'),
            b: localStorage.getItem('backgroundColorB'),
            a: '1',
        },
        cardColor: {
            r: localStorage.getItem('cardColorR'),
            g: localStorage.getItem('cardColorG'),
            b: localStorage.getItem('cardColorB'),
            a: '1',
        },
        nodeColor: {
            r: localStorage.getItem('nodeColorR'),
            g: localStorage.getItem('nodeColorG'),
            b: localStorage.getItem('nodeColorB'),
            a: '1',
        },
      showPicker: false,
      showPickerSecondaryColor: false,
      showPickerAccentColor: false,
      showPickerBackgroundColor: false,
      showPickerCardColor: false,
      showPickerNodeColor: false,
    };
 
    onClick = () => {
        this.setState({ 
          showPicker: !this.state.showPicker 
        })
    };
 
    onClose = () => {
      this.setState({ 
        showPicker: false
      })
    };

    onClickSecondaryColor = () => {
        this.setState({ 
            showPickerSecondaryColor: !this.state.showPickerSecondaryColor 
        })
    };
 
    onCloseSecondaryColor = () => {
      this.setState({ 
        showPickerSecondaryColor: false 
      })
    };

    onClickAccentColor = () => {
        this.setState({ 
            showPickerAccentColor: !this.state.showPickerAccentColor 
        })
    };
 
    onCloseAccentColor = () => {
      this.setState({ 
        showPickerAccentColor: false 
      })
    };

    onClickBackgroundColor = () => {
        this.setState({
            showPickerBackgroundColor: !this.state.showPickerBackgroundColor 
        })
    };
 
    onCloseBackgroundColor = () => {
      this.setState({ 
        showPickerBackgroundColor: false
      })
    };

    onClickCardColor = () => {
        this.setState({
            showPickerCardColor: !this.state.showPickerCardColor 
        })
    };
 
    onCloseCardColor = () => {
      this.setState({ 
        showPickerCardColor: false 
      })
    };

    onClickNodeColor = () => {
        this.setState({
            showPickerNodeColor: !this.state.showPickerNodeColor 
        })
    };
 
    onCloseNodeColor = () => {
      this.setState({ 
        showPickerNodeColor: false 
      })
    };
 
    onChange = (primaryColor) => {
        this.setState({ 
            primaryColor: primaryColor.rgb
        })
        localStorage.setItem('primaryColor', primaryColor.hex)
        localStorage.setItem('primaryColorR', primaryColor.rgb.r)
        localStorage.setItem('primaryColorG', primaryColor.rgb.g)
        localStorage.setItem('primaryColorB', primaryColor.rgb.b)
    };

    onChangeSecondaryColor = (secondaryColor) => {
        this.setState({ 
          secondaryColor: secondaryColor.rgb
        })
        localStorage.setItem('secondaryColor', secondaryColor.hex)
        localStorage.setItem('secondaryColorR', secondaryColor.rgb.r)
        localStorage.setItem('secondaryColorG', secondaryColor.rgb.g)
        localStorage.setItem('secondaryColorB', secondaryColor.rgb.b)
    };

    onChangeAccentColor = (accentColor) => {
        this.setState({ 
            accentColor: accentColor.rgb
        })
        localStorage.setItem('accentColor', accentColor.hex)
        localStorage.setItem('accentColorR', accentColor.rgb.r)
        localStorage.setItem('accentColorG', accentColor.rgb.g)
        localStorage.setItem('accentColorB', accentColor.rgb.b)
    };

    onChangeBackgroundColor = (backgroundColor) => {
        this.setState({ 
            backgroundColor: backgroundColor.rgb
        })
        localStorage.setItem('backgroundColor', backgroundColor.hex)
        localStorage.setItem('backgroundColorR', backgroundColor.rgb.r)
        localStorage.setItem('backgroundColorG', backgroundColor.rgb.g)
        localStorage.setItem('backgroundColorB', backgroundColor.rgb.b)
    };
    
    onChangeCardColor = (cardColor) => {
        this.setState({ 
            cardColor: cardColor.rgb
        })

        localStorage.setItem('cardColor', cardColor.hex)
        localStorage.setItem('cardColorR', cardColor.rgb.r)
        localStorage.setItem('cardColorG', cardColor.rgb.g)
        localStorage.setItem('cardColorB', cardColor.rgb.b)
    };

    onChangeNodeColor = (nodeColor) => {
        this.setState({ 
            nodeColor: nodeColor.rgb
        })

        localStorage.setItem('nodeColor', nodeColor.hex)
        localStorage.setItem('nodeColorR', nodeColor.rgb.r)
        localStorage.setItem('nodeColorG', nodeColor.rgb.g)
        localStorage.setItem('nodeColorB', nodeColor.rgb.b)
    };


    render() {
 
      const styles = reactCSS({
        'default': {
          primaryColor: {
            width: '80px',
            height: '30px',
            borderRadius: '3px',
            background: `rgba(${ this.state.primaryColor.r }, ${ this.state.primaryColor.g }, ${ this.state.primaryColor.b }, ${ this.state.primaryColor.a })`,
          },
          secondaryColor: {
            width: '80px',
            height: '30px',
            borderRadius: '3px',
            background: `rgba(${ this.state.secondaryColor.r }, ${ this.state.secondaryColor.g }, ${ this.state.secondaryColor.b }, ${ this.state.secondaryColor.a })`,
          },
          accentColor: {
            width: '80px',
            height: '30px',
            borderRadius: '3px',
            background: `rgba(${ this.state.accentColor.r }, ${ this.state.accentColor.g }, ${ this.state.accentColor.b }, ${ this.state.accentColor.a })`,
          },
          backgroundColor: {
            width: '80px',
            height: '30px',
            borderRadius: '3px',
            background: `rgba(${ this.state.backgroundColor.r }, ${ this.state.backgroundColor.g }, ${ this.state.backgroundColor.b }, ${ this.state.backgroundColor.a })`,
          },
          cardColor: {
            width: '80px',
            height: '30px',
            borderRadius: '3px',
            background: `rgba(${ this.state.cardColor.r }, ${ this.state.cardColor.g }, ${ this.state.cardColor.b }, ${ this.state.cardColor.a })`,
          },
          nodeColor: {
            width: '80px',
            height: '30px',
            borderRadius: '3px',
            background: `rgba(${ this.state.nodeColor.r }, ${ this.state.nodeColor.g }, ${ this.state.nodeColor.b }, ${ this.state.nodeColor.a })`,
          },
          popover: {
            position: 'absolute',
            zIndex: '3',
          },
          cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          },
          swatch: {
            margin:'auto',
            padding: '6px',
            background: '#ffffff',
            borderRadius: '2px',
            cursor: 'pointer',
            display: 'inline-block',
            text: 'center',
            boxShadow: '0 0 0 1px rgba(0,0,0,.2)',
          },   
        },
      });
 
      return (
        <div>
            <div className='settings-container'>
                {/* Primary Color */}
                <Typography id="settings-title"> Primary Color: </Typography>
                <div style={ styles.swatch } onClick={ this.onClick }>
                <div style={ styles.primaryColor } />
                </div>
                { this.state.showPicker ? <div style={ styles.popover }>
                <div style={ styles.cover } onClick={ this.onClose }/>
                <SketchPicker color={ this.state.primaryColor } onChange={ this.onChange } />
                </div> : null }

                {/* Secondary Color */}
                <Typography id="settings-title"> Secondary Color: </Typography>
                <div style={ styles.swatch } onClick={ this.onClickSecondaryColor }>
                <div style={ styles.secondaryColor } />
                </div>
                { this.state.showPickerSecondaryColor ? <div style={ styles.popover }>
                <div style={ styles.cover } onClick={ this.onCloseSecondaryColor }/>
                <SketchPicker color={ this.state.secondaryColor } onChange={ this.onChangeSecondaryColor } />
                </div> : null }

                {/* Accent Color */}
                <Typography id="settings-title"> Accent Color: </Typography>
                <div style={ styles.swatch } onClick={ this.onClickAccentColor }>
                <div style={ styles.accentColor } />
                </div>
                { this.state.showPickerAccentColor ? <div style={ styles.popover }>
                <div style={ styles.cover } onClick={ this.onCloseAccentColor }/>
                <SketchPicker color={ this.state.accentColor } onChange={ this.onChangeAccentColor } />
                </div> : null }

                {/* Background Color */}
                <Typography id="settings-title"> Background Color: </Typography>
                <div style={ styles.swatch } onClick={ this.onClickBackgroundColor }>
                <div style={ styles.backgroundColor } />
                </div>
                { this.state.showPickerBackgroundColor ? <div style={ styles.popover }>
                <div style={ styles.cover } onClick={ this.onCloseBackgroundColor }/>
                <SketchPicker color={ this.state.backgroundColor } onChange={ this.onChangeBackgroundColor } />
                </div> : null }

                {/* Card Color */}
                <Typography id="settings-title"> Card Color: </Typography>
                <div style={ styles.swatch } onClick={ this.onClickCardColor }>
                <div style={ styles.cardColor } />
                </div>
                { this.state.showPickerCardColor ? <div style={ styles.popover }>
                <div style={ styles.cover } onClick={ this.onCloseCardColor }/>
                <SketchPicker color={ this.state.cardColor } onChange={ this.onChangeCardColor } />
                </div> : null }

                {/* Node Color */}
                <Typography id="settings-title"> Node Color: </Typography>
                <div style={ styles.swatch } onClick={ this.onClickNodeColor }>
                <div style={ styles.nodeColor } />
                </div>
                { this.state.showPickerNodeColor ? <div style={ styles.popover }>
                <div style={ styles.cover } onClick={ this.onCloseNodeColor }/>
                <SketchPicker color={ this.state.nodeColor } onChange={ this.onChangeNodeColor } />
                </div> : null }

            </div>
            <div className='settings-container'>
                <div className="button-location">
                    <button class="button3" onClick={NavigateToDashboard}>Dashboard</button>
                    <button class="button4" onClick={defaultColors}>Default Colors</button>
                </div>
            </div>
        </div>
      )
    }
}
 
export default Settings

// Primary color: Text color
// Secondary color: Highlight color to the background
// Background color: Background color
// Accent color: What we use gold for