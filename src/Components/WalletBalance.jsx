import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCopy, faPlus, faMinus, faArrowDown, faArrowUp, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../Styles/WalletBalance.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateWalletBalance } from '../Controller/assetscontroller';
import { updateEthWalletAddress } from '../Controller/assetscontroller';

const WalletBalance = () => {
    const balance = useSelector((state) => state.cryptoAssetsController.totalWalletBalance);
    const ethAddress = useSelector((state) => state.cryptoAssetsController.ethWalletAddress);
    const [showBalance, setShowBalance] = useState(true);
    const [copied, setCopied] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`${process.env.REACT_APP_BALANCE_API_URL}`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                }
            })
            .then(response => {
                dispatch(updateWalletBalance(response.data.estimatedUSDBalance));
            })
            .catch(error => {
                console.error('There was an error fetching the balance!', error);
            });

            // Fetching wallet addresses
            axios.get(`${process.env.REACT_APP_ADDRESS_API_URL}`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                }
            })
            .then(response => {
                const ethAddress = response.data.walletAddresses.ETH;
                if (ethAddress) {
                    dispatch(updateEthWalletAddress(ethAddress));
                } else {
                    console.log('ETH address not found');
                }
            })
            .catch(error => {
                console.error('There was an error fetching the wallet addresses!', error);
            });
        }
    }, [dispatch]);

    const toggleShowBalance = () => {
        setShowBalance(!showBalance);
    };

    const copyToClipboard = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(ethAddress).then(() => {
                console.log('Text copied to clipboard');
                setCopied(true);
                setTimeout(() => setCopied(false), 1000);
            }).catch(err => {
                console.error('Failed to copy text to clipboard: ', err);
            });
        } else {
            // Fallback for browsers that don't support navigator.clipboard
            console.warn('Clipboard API not supported, using fallback');
            const textArea = document.createElement("textarea");
            textArea.value = ethAddress;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                console.log('Text copied to clipboard using fallback');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy text to clipboard: ', err);
            }
            document.body.removeChild(textArea);
        }
    };

    const formatAddress = (address) => {
        if (!address) return '';
        const start = address.slice(0, 7);
        const end = address.slice(-4);
        return `${start}...${end}`;
    };

    return (
        <div className="wallet-balance-container pt-8 pb-8 pr-8 pl-8 mb-4 rounded-xl">
            <div className="balance-header display: flex items-center justify-center mb-2">
                <span className='currentBalanceText text-lg sm:text-lg md:text-lg lg:text-xl xl:text-xl mr-2 text-white'>Current Balance</span>
                <FontAwesomeIcon 
                    icon={showBalance ? faEyeSlash : faEye} 
                    onClick={toggleShowBalance} 
                    className="icon text-white cursor-pointer" 
                />
            </div>
            <div className="balance-display text-center font-bold text-2xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl text-white mb-2">
                {showBalance ? `$${balance}` : '****'}
            </div>
            <div className="wallet-address display: flex items-center justify-center text-center w-full mb-4 text-white">
                <div className='walletAndCopyIcon'>
                    {formatAddress(ethAddress)}
                    <FontAwesomeIcon 
                        icon={faCopy} 
                        onClick={copyToClipboard} 
                        className="icon ml-5" 
                    />
                    {copied && <div className="copied-message px-1 bg-slate-400 text-white rounded-lg">Eth wallet Copied to clipboard!</div>}
                </div>
            </div>
            <div className="actions-container display: flex justify-between">
                <div className="action-button display: flex items-center flex-col text-white mr-3">
                    <button className='transactionBtn'><FontAwesomeIcon icon={faPlus} className='transactionBtnIcon'/></button>
                    <span className=''>Buy</span>
                </div>
                <div className="action-button display: flex items-center flex-col text-white mr-3">
                    <button className='transactionBtn'><FontAwesomeIcon icon={faMinus} className='transactionBtnIcon'/></button>
                    <span>Sell</span>
                </div>
                <div className="action-button display: flex items-center flex-col text-white mr-3">
                    <button className='transactionBtn'><FontAwesomeIcon icon={faArrowDown} className='transactionBtnIcon'/></button>
                    <span>Deposit</span>
                </div>
                <div className="action-button display: flex items-center flex-col text-white mr-3">
                    <button className='transactionBtn'><FontAwesomeIcon icon={faArrowUp} className='transactionBtnIcon'/></button>
                    <span>Withdraw</span>
                </div>
                <div className="action-button display: flex items-center flex-col text-white">
                    <button className='transactionBtn'> <FontAwesomeIcon icon={faExchangeAlt} className='transactionBtnIcon'/></button>
                    <span>Swap</span>
                </div>
            </div>
        </div>
    );
};

export default WalletBalance;
