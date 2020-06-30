import React, { useState, useEffect } from 'react';
import { makeStyles, Tooltip } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyIcon } from '../../icons/CopyIcon';

const useStyles = makeStyles(theme => ({
    lightTooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
    },
    tooltipIcon: {
        height: '100%',
        cursor: 'pointer',
        padding: 0,
    },
}));

export const CopyToClipboardButton = ({ textToCopy, darkTooltip = false, iconColor, disabled }) => {
    const classes = useStyles();
    const [copied, setCopied] = useState(false);
    iconColor = disabled ? 'rgba(255, 92, 1, 0.2)' : '#FF5C01';

    console.log('disabled: ', disabled);
    console.log('iconColor: ', iconColor);

    useEffect(
        () => {
            setTimeout(() => setCopied(false), 3000);
        },
        [copied],
    );

    const handleCopy = () => {
        if (!disabled) {
            setCopied(true);
        }
    };

    const tooltipClasses = darkTooltip ? null : { tooltip: classes.lightTooltip };

    return (
        <CopyToClipboard
            text={textToCopy}
            onCopy={handleCopy}
        >
            <Tooltip
                title="Copied!"
                open={copied}
                arrow
                placement="top"
                classes={tooltipClasses}
            >
                <span className={classes.tooltipIcon}>
                    <CopyIcon color={iconColor} />
                </span>
            </Tooltip>
        </CopyToClipboard>
    );
};
