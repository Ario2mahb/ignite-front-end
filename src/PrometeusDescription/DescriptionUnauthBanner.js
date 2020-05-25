import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { localized } from '../localization/components';

const useStyles = makeStyles(theme => ({
    prometeusLink: {
        color: theme.palette.primary.main,
    },
    bannerContainer: {
        padding: '0 24px',
        border: '1px solid #F1EBE8',
        boxSizing: 'border-box',
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    bannerBox: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: '24px 0',
    },
    baseLine: {
        width: '100%',
        height: 1,
        border: '1px solid #F1EBE8',
        boxSizing: 'border-box',
    },
    bannerHeader: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        '& h3': {
            fontFamily: 'Museo Sans Cyrl Bold',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: 15,
            color: '#1C1C1C',
            lineHeight: '22px',
            margin: '5px 0 0 8px',
        },
    },
    bannerHeaderImg: {
        width: 36,
        height: 36,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    bannerBody: {
        width: '100%',
        fontFamily: 'Museo Sans Cyrl Regular',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: 15,
        color: '#A2A2A2',
        margin: '12px 0 0 0',
        lineHeight: '22px',
    },
}));


const _DescriptionUnauthBanner = ({ routerStore, l, locale }) => {
    const classes = useStyles();

    return (
        <Grid container spacing={2} className={classes.bannerContainer}>
            <Grid className={classes.bannerBox}>
                <div className={classes.bannerHeader}>
                    <div className={classes.bannerHeaderImg}>
                        <img src="/descriptions/unblockable.svg" />
                    </div>
                    <h3>
                        {l('description.unauth-banner.unblockable')}
                    </h3>
                </div>
                <div className={classes.bannerBody}>{l('description.unauth-banner.unblockable.description')}</div>
            </Grid>

            <div className={classes.baseLine} />

            <Grid className={classes.bannerBox}>
                <div className={classes.bannerHeader}>
                    <div className={classes.bannerHeaderImg}>
                        <img src="/descriptions/censorship-free.svg" />
                    </div>
                    <h3>
                        {l('description.unauth-banner.Censorship-free')}
                    </h3>
                </div>
                <div className={classes.bannerBody}>{l('description.unauth-banner.Censorship-free.description')}</div>
            </Grid>

            <div className={classes.baseLine} />

            <Grid className={classes.bannerBox}>
                <div className={classes.bannerHeader}>
                    <div className={classes.bannerHeaderImg}>
                        <img src="/descriptions/shield.svg" />
                    </div>
                    <h3>
                        {l('description.unauth-banner.Immutable')}
                    </h3>
                </div>
                <div className={classes.bannerBody}>{l('description.unauth-banner.Immutable.description')}</div>
            </Grid>

            <div className={classes.baseLine} />

            <Grid className={classes.bannerBox}>
                <div className={classes.bannerHeader}>
                    <div className={classes.bannerHeaderImg}>
                        <img src="/descriptions/anonymous.svg" />
                    </div>
                    <h3>
                        {l('description.unauth-banner.Anonymous')}
                    </h3>
                </div>
                <div className={classes.bannerBody}>{l('description.unauth-banner.Anonymous.description')}</div>
            </Grid>
        </Grid>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store,
});

export const DescriptionUnauthBanner = localized(
    inject(mapMobxToProps)(observer(_DescriptionUnauthBanner)),
);
