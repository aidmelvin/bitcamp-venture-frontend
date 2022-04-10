import * as React from 'react';
import { Image, SafeAreaView, View, Text, ImageBackground, ScrollView } from "react-native";
import { useAuthStore, useEventStore } from '../../lib/store';
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Feather";
import { useMemo } from 'react';
import { Event } from 'src/lib/model/Event';
import EVENTS from "../../lib/mockEvents";

interface Group {
    name: string;
    color: string;
    member: string;
}

const GROUPS: Group[] = [
    { name: 'UMD Club Volleyball', member: 'Lucas Matanguihan', color: 'tomato' },
    { name: 'Startup Shell', member: 'Haroon Mokhtarzada', color: 'dodgerblue', },
    { name: 'P Freddy Gang', member: 'Samai Patel', color: 'aquamarine' },
]

const GroupContainer = styled.View`
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;
`;

const GroupIcon = styled.View`
    height: 50px;
    width: 50px;
    background-color: ${props => props.color};
    border-radius: 50px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const GroupName = styled.Text`
    font-weight: bold;
    font-size: 18px;
`;

const GroupMember = styled.Text`
    font-size: 18px;
    color: #555555;
`;

const GroupMembersButton = styled.TouchableOpacity`
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 10px;
    background-color: #386641;
    border-radius: 8px;
`;

interface GroupListProps {
    groups: Group[];
}

const GroupList = ({ groups }: GroupListProps) => {
    return (
        <View>
            {groups.map(group => (
                <GroupContainer>
                    <GroupIcon color={group.color}>
                        <Text style={{ fontSize: 24, textAlign: 'center', fontWeight: 'bold' }}>{group.name[0]}</Text>
                    </GroupIcon>
                    <View style={{ marginLeft: 20 }}>
                        <GroupName>{group.name}</GroupName>
                        <GroupMember>With {group.member}</GroupMember>
                    </View>
                    <View style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <GroupMembersButton>
                            <Icon name="users" size={24} color="whitesmoke" />
                        </GroupMembersButton>
                    </View>
                </GroupContainer>
            ))
            }
        </View >
    )
}

const EventList = () => {
    const events = useEventStore(state => {
        return EVENTS.filter(event => state.likes.has(event.id));
    });

    return (
        <View>
            {events.map(event => (
                <View style={{ marginBottom: 24}}>
                    <Image
                        source={event.image_src}
                        resizeMode="cover"
                        style={{ height: 250, width: '100%', borderRadius: 16, marginBottom: 8 }}
                    />
                    <Text style={{ fontSize: 16, textTransform: 'uppercase', letterSpacing: 1, fontWeight: '400' }}>{event.location_string}</Text>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{event.title}</Text>
                    <Text style={{ fontSize: 18, color: "#555555" }}>
                        {event.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} @ {event.time}
                    </Text>
                </View>
            ))}
        </View>
    )
}

const ProfilePicArea = styled.View`
    margin: 24px auto 0px auto;
`;

const Username = styled.Text`
    font-weight: bold;
    font-size: 44px;
    text-align: center;
    margin-top: 10px;
`;

const FollowersInfo = styled.Text`
    font-size: 18px;
    text-align: center;
`;

const SecondaryText = styled.Text`
    margin-top: 24px;
    font-size: 30px;
    font-weight: bold;
`;

export default function Profile() {
    const user = useAuthStore(state => state.user);

    return (
        <SafeAreaView>
            <ScrollView style={{ padding: 12 }}>
                <View style={{ paddingBottom: 24 }}>
                    <ProfilePicArea>
                        <Image
                            source={require('../../../assets/profiles/zach.jpeg')}
                            style={{ width: 150, height: 150, borderRadius: 150 }}
                            resizeMode="cover" />
                    </ProfilePicArea>
                    <Username>{user.username}</Username>
                    <FollowersInfo>216 Followers | 132 Following</FollowersInfo>
                    <SecondaryText style={{ marginBottom: 16 }}>{user.username}'s Groups</SecondaryText>
                    <GroupList groups={GROUPS} />
                    <SecondaryText style={{ marginTop: 16, marginBottom: 16 }}>{user.username}'s Events</SecondaryText>
                    <EventList />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}