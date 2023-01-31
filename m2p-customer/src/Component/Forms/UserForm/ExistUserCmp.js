import React from 'react'
import Aux from '../../../hoc/Aux';
import { Text } from '../../../View/Language/Language';
import {SytledINPUT, SytledBUTTON} from '../../../hoc/style_component'

const ExistUserCmp = (props) => {
    return (
        <Aux>
            <div className="col-md-4">
                <form className="proceed-form text-left" onSubmit={props.NewUser}>
                    <div className="form-group position-relative">
                        <label className="custom-label" htmlFor="aadhaar">
                            <Text tid="enter_vcip_no" />
                        </label>
                        <SytledINPUT
                            color = {props.color}
                            type="number"
                            className="form-control custom-inp"
                            name="vcipid"
                            onChange={props.changeOld}
                            maxLength="10"
                            min="4"
                            autoFocus
                            autoComplete="off"
                            placeholder="Enter vcip Number"
                            required
                        />
                    </div>
                    <div className="text-center">
                        <SytledBUTTON color = {props.color} type="submit" disabled={props.disable} className="custom-btn">
                        <Text tid="proceed" />
                        {props.spinner ? <span className="spinner"></span> : null}
                        </SytledBUTTON>
                    </div>

                </form>
            </div>
        </Aux>
    )
}

export default ExistUserCmp;
