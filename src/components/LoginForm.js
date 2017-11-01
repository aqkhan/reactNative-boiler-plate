import React, { Component } from 'react';
import { Card, CardSection, Button, Input } from "./common/";

class LoginForm extends Component {

    // Set state
    state = {
        email: '',
        password: ''
    };

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
                <CardSection>
                    <Button>Login</Button>
                </CardSection>
            </Card>
        );
    }
}

export default LoginForm;