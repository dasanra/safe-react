import { TextField as SRCTextField } from '@gnosis.pm/safe-react-components'
import React from 'react'
import { useField } from 'react-final-form'
import { useSelector } from 'react-redux'

import GnoField from 'src/components/forms/Field'
import { composeValidators, minValue, mustBeFloat, required } from 'src/components/forms/validator'
import { extendedSafeTokensSelector } from 'src/routes/safe/container/selector'
import styled from 'styled-components'
import { useStyles } from './style'

export const Field = styled(GnoField)`
  margin: 8px 0;
  width: 100%;
`

const AmountInput = styled.div`
  grid-area: amountInput;
`

const TextField = styled(SRCTextField)`
  margin: 0;
`

export const Amount = (): React.ReactElement => {
  const classes = useStyles()

  const {
    input: { value: tokenAddress },
  } = useField('token', { subscription: { value: true } })
  const {
    meta: { touched, visited },
  } = useField('amount', { subscription: { touched: true, visited: true } })

  const tokens = useSelector(extendedSafeTokensSelector)

  const selectedTokenRecord = tokens.find((token) => token.address === tokenAddress)

  const validate = (touched || visited) && composeValidators(required, mustBeFloat, minValue(0, false))

  return (
    <AmountInput>
      <Field
        component={TextField}
        label="Amount*"
        name="amount"
        type="text"
        data-testid="amount-input"
        endAdornment={selectedTokenRecord?.symbol}
        className={classes.amountInput}
        validate={validate}
      />
    </AmountInput>
  )
}