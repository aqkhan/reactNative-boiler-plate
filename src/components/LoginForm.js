import React, { Component } from 'react';
import { Card, CardSection, Button, Input, Spinner } from "./common/";
import axios from 'axios';
import {Text, View} from "react-native";

class LoginForm extends Component {



    // Set state
    state = {
        email: '',
        password: '',
        accessToken: '',
        loginStatus: false,
        console: '',
        apiMessage: '',
        loading: false
    };

    // Login method
    logMeIn() {
        this.setState( { loading: true } );
        const url = 'https://project-cx.herokuapp.com';
        axios.post(
            url + '/auth',
            {
                username: this.state.email,
                password: this.state.password
            }
        ).then(
            response => {
                this.onLoginSuccess(response);
            }
        ).catch(
            error => {
                console.log('API Error: ', error);
                this.setState({ loginStatus: false, loading: false });

                // Send data back to parent component via callback
                this.props.callbackFromParent(false);
            }
        )
    }

    onLoginSuccess(response) {
        this.setState({
            accessToken: response.data.token,
            console: response.data.console,
            apiMessage: response.data.message,
            loading: false,
            loginStatus: false
        });

        // Send data back to parent component via callback
        this.props.callbackFromParent(false);

        if (response.data.success === true) {
            this.setState({ loginStatus: true, loading: false });

            // Send data back to parent component via callback
            this.props.callbackFromParent(true);
        }
    }

    // Switch between button and loader
    renderButton() {
        if (this.state.loading) {
            return(
                <Spinner size='large' />
            )
        }
        else {
            return(
                <Button onPress={this.logMeIn.bind(this)}>Login</Button>
            )
        }
    }

    render() {
        return(
            <Card>
                <CardSection>
                    <Input
                        placeholder = 'Enter email address'
                        autoCapitalize = 'none'
                        label = 'EMAIL'
                        value = { this.state.email }
                        onChangeText = { email => this.setState( { email } ) }
                    />
                </CardSection>
                <CardSection>
                    <Input
                        placeholder = 'password'
                        label = 'PASSWORD'
                        autoCapitalize = 'none'
                        secureTextEntry = { true }
                        value = { this.state.password }
                        onChangeText = { password => this.setState( { password } ) }
                    />
                </CardSection>
                <View style={(this.state.loginStatus) ? {display: 'none'} : {display: 'flex'}}>
                    <Text style={ styles.errorText }>
                        { this.state.apiMessage }
                    </Text>
                </View>
                <CardSection>
                    { this.renderButton() }
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorText: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;