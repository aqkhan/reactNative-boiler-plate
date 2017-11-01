import React, { Component } from 'react';
import { Card, CardSection, Button, Input } from "./common/";
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
        apiMessage: ''
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
                this.setState({
                    accessToken: response.data.token,
                    console: response.data.console,
                    apiMessage: response.data.message
                });
                if (response.data.success === true) {
                    this.setState({ loginStatus: true });
                }
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
                <View style={(this.state.loginStatus === false) ? {display: 'flex'} : {display: 'none'}}>
                    <Text style={ styles.errorText }>
                        { this.state.apiMessage }
                    </Text>
                </View>
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