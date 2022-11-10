import React from 'react'
import { SketchPicker } from 'react-color'
import reactCSS from 'reactcss'
import {Typography} from '@material-ui/core';
import './Settings.css';
import { GRAY, GRAYBLACK, UCF_GOLD } from "../../assets/colors";


function NavigateToDashboard(){
	window.location.href = "/";
}

class Settings extends React.Component {
    
    primaryColor = localStorage.getItem('primaryColor') ? localStorage.getItem('primaryColor') : "#FFFFFF"
    secondaryColor = localStorage.getItem('secondaryColor') ? localStorage.getItem('secondaryColor') : GRAYBLACK
    backgroundColor = localStorage.getItem('backgroundColor') ? localStorage.getItem('backgroundColor') : "#000000"
    accentColor = localStorage.getItem('accentColor') ? localStorage.getItem('accentColor') : UCF_GOLD

    state = {
        primaryColor: {
            r: '255',
            g: '255',
            b: '255',
            a: '1',
        },
        secondaryColor: {
            r: '64',
            g: '66',
            b: '67',
            a: '1',
        },
        backgroundColor: {
            r: '0',
            g: '0',
            b: '0',
            a: '1',
        },
        accentColor: {
            r: '255',
            g: '201',
            b: '4',
            a: '1',
        },
      showPicker: false,
      showPickerSecondaryColor: false,
      showPickerBackgroundColor: false,
      showPickerAccentColor: false,
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
 
    onChange = (primaryColor) => {
        this.setState({ 
            primaryColor: primaryColor.rgb
        })
        localStorage.setItem('primaryColor', primaryColor.hex)
    };

    onChangeSecondaryColor = (secondaryColor) => {
        this.setState({ 
          secondaryColor: secondaryColor.rgb
        })
        localStorage.setItem('secondaryColor', secondaryColor.hex)
    };

    onChangeBackgroundColor = (backgroundColor) => {
        this.setState({ 
            backgroundColor: backgroundColor.rgb
        })
        localStorage.setItem('backgroundColor', backgroundColor.hex)
    };

    onChangeAccentColor = (accentColor) => {
        this.setState({ 
            accentColor: accentColor.rgb
        })
        localStorage.setItem('accentColor', accentColor.hex)
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
          backgroundColor: {
            width: '80px',
            height: '30px',
            borderRadius: '3px',
            background: `rgba(${ this.state.backgroundColor.r }, ${ this.state.backgroundColor.g }, ${ this.state.backgroundColor.b }, ${ this.state.backgroundColor.a })`,
          },
          accentColor: {
            width: '80px',
            height: '30px',
            borderRadius: '3px',
            background: `rgba(${ this.state.accentColor.r }, ${ this.state.accentColor.g }, ${ this.state.accentColor.b }, ${ this.state.accentColor.a })`,
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
        <div className='container'>
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

            {/* Background Color */}
            <Typography id="settings-title"> Background Color: </Typography>
            <div style={ styles.swatch } onClick={ this.onClickBackgroundColor }>
            <div style={ styles.backgroundColor } />
            </div>
            { this.state.showPickerBackgroundColor ? <div style={ styles.popover }>
            <div style={ styles.cover } onClick={ this.onCloseBackgroundColor }/>
            <SketchPicker color={ this.state.backgroundColor } onChange={ this.onChangeBackgroundColor } />
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
        
            {/* <div className="button-location">
                <button class="button" onClick={NavigateToDashboard}>Dashboard</button>
                <button class="button2" >Default Colors</button>
			</div> */}

        </div>
      )
    }
}
 
export default Settings

// Primary color: Text color
// Secondary color: Highlight color to the background
// Background color: Background color
// Accent color: What we use gold for