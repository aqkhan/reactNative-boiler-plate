import React, { Component } from 'react';
import { Card, CardSection, Button, Input } from "./common/";
import axios from 'axios';
import {Text} from "react-native";

class LoginForm extends Component {

    // Set state
    state = {
        email: '',
        password: '',
        accessToken: '',
        loginStatus: false,
        console: ''
    };

    // Login method
    logMeIn() {
        const url = 'https://project-cx.herokuapp.com';
        axios.post(
            url + '/auth',
            {
                username: this.state.email,
                password: this.state.password
            }
        ).then(
            response => {
                console.log('Data: ', response.data.message);
                this.setState({
                    accessToken: response.data.token,
                    loginStatus: response.data.message,
                    console: response.data.console
                });
            }
        ).catch(
            error => {
                console.log('API Error: ', error);
            }
        )
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
                <Text style={ styles.errorText }>
                    { this.state.loginStatus }
                </Text>
                <CardSection>
                    <Button onPress={this.logMeIn.bind(this)}>Login</Button>
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