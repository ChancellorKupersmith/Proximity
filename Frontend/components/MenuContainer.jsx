import React, { Component } from 'react';
import { StaysPage, GosPage, FavsPage } from './MenuPages.jsx';
import deleteIcon from '../assets/delete_icon.png'
import menuIcon from '../assets/menu_icon.png'

class MenuContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            collapsed: true,
            tabKey: 'stay',
        };
        this.openCloseMenu = this.openCloseMenu.bind(this);
        this.changeTab = this.changeTab.bind(this);
    }
    openCloseMenu(){
        // list of elements to trigger transitions
        const searchBar = document.getElementById('search-container');
        const menuContainer = document.getElementById('menu-container');
        const menuBtnOpen = document.getElementById('menu-btn-open');
        const menuBtnClose = document.getElementById('menu-btn-close');
        const title = document.getElementById('title');
        const staysPage = document.getElementById('stays-page');
        const gosPage = document.getElementById('gos-page');
        const favsPage = document.getElementById('favs-page');

        if(this.state.collapsed){
            // only animate if half screen
            // searchBar.classList.add('moveRight');
            
            menuContainer.classList.add('open');
            menuBtnOpen.classList.add('hide');
            menuBtnClose.classList.add('show');
            title.classList.add('show');
            switch(this.state.tabKey){
                case 'stay':
                    staysPage.classList.add('show');
                    break;
                case 'go':
                    gosPage.classList.add('show');
                    break;
                case 'fav':
                    favsPage.classList.add('show');
                    break;
                default:
                    break; 
            }
        }
        else{
            // searchBar.classList.remove('moveRight');
            menuContainer.classList.remove('open')
            menuBtnOpen.classList.remove('hide');
            menuBtnClose.classList.remove('show');
            title.classList.remove('show');
            switch(this.state.tabKey){
                case 'stay':
                    staysPage.classList.remove('show');
                    break;
                case 'go':
                    gosPage.classList.remove('show');
                    break;
                case 'fav':
                    favsPage.classList.remove('show');
                    break;
                default:
                    break; 
            }
        }
        this.setState({
            ...this.state,
            collapsed: !this.state.collapsed
        });
    }
    changeTab(key) {
        this.setState({
            ...this.state,
            tabKey: key
        });
    }
    render() {
        return (
            <div id='menu-container' className='menu' 
                onClick={ this.state.collapsed ? this.openCloseMenu : () => {} }
            >
                <h1 id='title' className='title'>Proximity</h1>
                <div
                    id='menu-btn-open'
                    className='menu-btn-open'
                    onClick={this.openCloseMenu}
                >
                    <img id='menu-icon' className='icons' src={menuIcon}/>
                </div>
                <div 
                    id='menu-btn-close'
                    className='menu-btn-close'
                    onClick={this.openCloseMenu}
                >
                    <img id='delete-icon' className='icons' src={deleteIcon}/>
                </div>
                <StaysPage changeTab={this.changeTab} />
                <GosPage changeTab={this.changeTab} />
                <FavsPage changeTab={this.changeTab} />
            </div>
        )
    }
}
export default MenuContainer;