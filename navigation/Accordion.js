import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";

export default class Accordion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            expanded: false,
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    render() {

        return (
            <View style={styles.accordContainer}>
                <TouchableOpacity ref={this.accordian} style={styles.row} onPress={() => this.toggleExpand()}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.arrow}>{this.state.expanded ? String.fromCharCode(9650) : String.fromCharCode(9660)}</Text>
                </TouchableOpacity>
                <View style={styles.parentHr} />
                {
                    this.state.expanded &&
                    <View style={styles.child}>
                        <Text>{this.props.data}</Text>
                    </View>
                }

            </View>
        )
    }

    toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded })
    }

}

const styles = StyleSheet.create({
    accordContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 14,
    },
    arrow: {
        color: '#E3241D'
    },
    row: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        height: 56,
        alignItems: 'center',
        shadowColor: 'black',
        elevation: 6,
        backgroundColor: 'white',
        marginTop: 10,
        alignSelf: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent:'space-between',

    },
    parentHr: {
        height: 1,
        color: "white",
        width: '100%'
    },
    child: {
        width: '100%',
        backgroundColor: 'white',
        padding: 16,
        shadowColor: 'black',
        elevation: 6,
    }

});