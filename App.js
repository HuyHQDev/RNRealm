import React, {Component} from 'react';
import {View, StyleSheet, Text, AsyncStorage, TouchableOpacity} from 'react-native';
import {TodoSchema} from "./TodoSchema";
import UserSchema from "./UserSchema";
import * as Constant from "./Constant";
const Realm = require('realm');
import Person from "./Person";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            realm: null,
        };
    }

    openRealm(key) {
        Realm.open({
            schema: [TodoSchema, Person],
            encryptionKey: key,
        }).then(realm => {
            realm.write(() => {
                let length = [];
                let todoList = realm.objects('Todo');
                length[0] = todoList.length;
                let todo = realm.create('Todo', {title: 'New todo', content: 'Test ahhaha'});

                todo.title = 'AAA';
                let person = realm.create('Person', {
                    id: 2,
                    firstName: 'John',
                    lastName: 'Smithhhh',
                    todo: todo,
                    birthday: new Date(),
                }, true);


            });
            this.setState({realm});
        })
    }

    componentWillMount() {
        AsyncStorage.getItem(Constant.ENCRYPTION_KEY).then(key => {
            if (key !== null) {
                let tokens = key.split(';');
                let int8Array = new Int8Array(tokens.length);
                for (let index = 0; index < tokens.length; index++) {
                    int8Array[index] = tokens[index];
                }
                this.openRealm(Int8Array.from(int8Array));
            } else {
                key = this.createAndGetEncryptionKey();
                this.openRealm(key);
            }
        })
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    getRandomInt8Array(length) {
        let int8Array = new Int8Array(length);
        for (let index = 0; index < length; index++) {
            int8Array[index] = this.getRandomInt(-128, 128);
        }

        return int8Array;
    }

    createAndGetEncryptionKey() {
        const key = this.getRandomInt8Array(64);
        AsyncStorage.setItem(Constant.ENCRYPTION_KEY, key.join(';'));
        return key;
    }

    renderDeleteButton = () => {
        if (this.state.realm) {
            return <TouchableOpacity onPress={this.deleteAll}>
                <Text>Delete</Text>
            </TouchableOpacity>
        }
    };

    deleteAll = () => {
        this.state.realm.write(() => {
            this.state.realm.deleteAll();
        });
    };

    render() {
        const moreInfo = this.state.realm ?
            this.state.realm.objects('Person').filtered('firstName BEGINSWITH "J"')
            : 'Loading';

        return (
            <View style={styles.container}>
                <Text style={styles.text}>{JSON.stringify(moreInfo)}</Text>
                {this.renderDeleteButton()}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    }
});

