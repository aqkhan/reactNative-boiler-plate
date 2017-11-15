import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

    state = {
        loggedIn: false
    };

    // Logout helper method
    logOut() {
        this.setState({
            loggedIn: false
        });
    }

    callbackToGetDataFromChild = (dataFromChild) => {
        this.setState( { loggedIn: dataFromChild } );
        console.log('Data from child: ', this.state.loggedIn);
    };

    renderContent() {
        switch (this.state.loggedIn) {
            case true: {
                return(
                    <CardSection>
                        <Button onPress={ this.logOut.bind(this) }>Log out</Button>
                    </CardSection>
                )
            }
            case false: {
                return(
                    <LoginForm callbackFromParent = { this.callbackToGetDataFromChild } />
                )
            }
            default: {
                return <Spinner size='large' />
            }
        }
    }

    render() {
        return(
            <View>
                <Header headerText = 'Authentication' />
                {this.renderContent()}
            </View>
        );
    }
}

export default App