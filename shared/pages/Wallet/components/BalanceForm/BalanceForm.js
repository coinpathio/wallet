import React, { Fragment, useState } from 'react'
import CSSModules from 'react-css-modules'

import styles from 'pages/Wallet/Wallet.scss'
import Button from 'components/controls/Button/Button'
import { BigNumber } from 'bignumber.js'
import config from 'app-config'
import { FormattedMessage } from 'react-intl'
import dollar from '../../images/dollar.svg'
import btc from '../../images/btc.svg'

function BalanceForm({ usdBalance, currencyBalance, handleReceive, handleWithdraw, handleExchange, currency, changePercent, showButtons = true }) {
  const [activeCurrency, setActiveCurrency] = useState('usd')
  const isWidgetBuild = config && config.isWidget

  // eslint-disable-next-line default-case
  switch (currency) {
    case 'btc (sms-protected)':
      currency = 'BTC SMS'
      break
    case 'btc (multisig)':
      currency = 'BTC MULTISIG'
      break
  }
  
  return (
    <div styleName={isWidgetBuild && !config.isFullBuild ? 'yourBalance widgetBuild' : 'yourBalance'}>
      <div styleName="yourBalanceTop">
        <p styleName="yourBalanceDescr">
          <FormattedMessage id="Yourtotalbalance" defaultMessage="Ваш общий баланс" />
        </p>
        <div styleName="yourBalanceValue">
          {activeCurrency === 'usd' ? (
            // eslint-disable-next-line no-restricted-globals
            <p>
              <img src={dollar} alt="dollar" />
              {!isNaN(usdBalance)
                ? BigNumber(usdBalance)
                  .dp(2, BigNumber.ROUND_FLOOR)
                  .toString()
                : ''}
              {/* {changePercent ? (
                <span styleName={changePercent > 0 ? "green" : "red"}>
                  {`${changePercent > 0 ? `+${changePercent}` : `${changePercent}`}`}%
                </span>
              ) : (
                ""
              )} */}
            </p>
          ) : (
              <p>
                {currency === 'btc' ? <img src={btc} alt="btc" /> : ''}
                {BigNumber(currencyBalance)
                  .dp(5, BigNumber.ROUND_FLOOR)
                  .toString()}
              </p>
            )}
        </div>
        <div styleName="yourBalanceCurrencies">
          <button styleName={activeCurrency === 'usd' && 'active'} onClick={() => setActiveCurrency('usd')}>
            {/* // eslint-disable-next-line reactintl/contains-hardcoded-copy */}
            usd
          </button>
          <span />
          <button styleName={activeCurrency === 'btc' && 'active'} onClick={() => setActiveCurrency('btc')}>
            {currency}
          </button>
        </div>
      </div>
      {
         showButtons &&   
         (<div styleName="yourBalanceBottom">
            <Fragment>
              <Button blue id="depositBtn" onClick={() => handleReceive('Deposit')}>
                <FormattedMessage id="YourtotalbalanceDeposit" defaultMessage="Пополнить" />
              </Button> 
            </Fragment>
            <Fragment>
              <Button blue disabled={!currencyBalance} id="sendBtn" onClick={() => handleWithdraw('Send')}>
                <FormattedMessage id="YourtotalbalanceSend" defaultMessage="Отправить" />
              </Button>
            </Fragment>
            {isWidgetBuild && !config.isFullBuild && (
              <Button brand id="exchangeBtn" onClick={() => handleExchange()}>
                <FormattedMessage id="YourtotalbalanceExchange" defaultMessage="Обменять" />
              </Button>
            )}
         </div>)
      }

    </div>
  )
}

export default CSSModules(BalanceForm, styles, { allowMultiple: true })
