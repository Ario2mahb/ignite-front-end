import React, { Fragment } from 'react';
import { inject } from 'mobx-react';
import { Avatar, CardHeader, List, ListItem, ListItemAvatar, Typography, Hidden } from '@material-ui/core';
import { Link } from 'mobx-router';
import { trimString } from '../../utils/string-utils';
import { Routes } from '../../routes';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    cardHeader: {
        [theme.breakpoints.down('sm')]: {
            '& span': {
                width: '80%',
                overflowX: 'hidden',
                '&:after': {
                    content: "'...'",
                }
            }
        },
    }
}));

const _UsersList = ({ users, routerStore }) => (
    <List style={{padding: 0}}>
        {users.map(user => (
            <ListItem role="div" style={{ borderBottom: "1px solid #F1EBE8" }}>
                <ListItemAvatar>
                    <Avatar src={user.avatar || 'http://localhost:3000/avatars/original/missing.png'} />
                </ListItemAvatar>
                <CardHeader classes={{root: useStyles().cardHeader}}
                    title={(
                        <Link
                            view={Routes.userProfile}
                            params={{ username: user.id }}
                            store={routerStore}
                            style={{
                                color: 'inherit',
                            }}
                        >
                            <Hidden xsDown>
                                <Typography>
                                    <strong>{user.display_name}</strong>
                                </Typography>
                            </Hidden>
                            <Hidden smUp>
                                <Typography>
                                    <strong>{trimString(user.display_name, 28)}</strong>
                                </Typography>
                            </Hidden>
                        </Link>
                    )}
                    subheader={(
                        <>
                            <Hidden xsDown>
                                {user.username}
                            </Hidden>
                            <Hidden smUp>
                                <strong>{trimString(user.username, 28)}</strong>
                            </Hidden>
                        </>
                    )}
                />
            </ListItem>
        ))}
    </List>
);

const mapMobxToProps = ({ store }) => ({
    routerStore: store,
});

export const UsersList = inject(mapMobxToProps)(_UsersList);
