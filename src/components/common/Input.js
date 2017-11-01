import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ( { label, onChangeText, value, placeholder, autoCapitalize, secureTextEntry } ) => {
    return(
        <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>{ label }</Text>
            <TextInput
                placeholder = { placeholder }
                onChangeText = { onChangeText }
                autoCapitalize = { autoCapitalize }
                secureTextEntry = { secureTextEntry } // Password field
                value = { value }
                style = { styles.inputStyle }
                autoCorrect= { false } // Don't validate the input
            />
        </View>
    );
};

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 16,
        lineHeight: 23,
        flex: 2
    },
    labelStyle: {
        fontSize: 14,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export { Input };