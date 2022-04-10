
import { View, Text, SafeAreaView } from 'react-native';
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Feather";
import { useEventStore } from '../../lib/store';
import EVENTS from "../../lib/mockEvents";

const AlertOutline = styled.View`
    width: 100%;
    border: 1px #a0a0a0 solid;
    border-radius: 12px;
    padding: 12px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export default function Chat() {
    const userEvents = useEventStore(state => {
        return EVENTS.filter(event => state.likes.has(event.id));
    })

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 12 }}>
                {userEvents.map(event => (
                    <AlertOutline style={{ marginBottom: 12 }}>
                        <View style={{ paddingLeft: 12 }}>
                            <Icon name="alert-circle" size={24} color="#004df4" />
                        </View>
                        <View style={{ marginLeft: 12, paddingRight: 12 }}>
                            <Text>
                                Because you are interested in going to "{event.title}" at {event.location_string}, we've matched you with {event.people_going[0].first} {event.people_going[0].last}. Click <Text style={{ textDecorationLine: 'underline', color: 'dodgerblue' }}>here</Text> to view their profile.
                            </Text>
                        </View>
                    </AlertOutline>
                ))}
                {userEvents.length === 0 ? <AlertOutline>
                    <View style={{ paddingLeft: 12 }}>
                        <Icon name="frown" size={24} color="#004df4" />
                    </View>
                    <View style={{ marginLeft: 12, paddingRight: 12 }}>
                        <Text>Uh oh! You haven't liked any events so we can't match you with anyone. Like some events so we can match you with your next friend!</Text>
                    </View>
                </AlertOutline> : null}
            </View>
        </SafeAreaView>
    );
}