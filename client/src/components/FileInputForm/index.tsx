import { useField, useFormControl } from "m-open-form";
import { useSubscriber } from "open-observable";
import React from "react";


type Props = {
      type: 'text' | 'password' | 'email' | 'tel' | 'date' | 'time' | 'file' | 'color' | 'number',
      name: string,
      label: string,
      placeholder?: string,
      id?: string,
      inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search',
      className?: string,
      required?: boolean,
      readonly?: boolean | false,
      value?: string
      onChange?: Function
      minDate?: string
      defaultValue?: string
      warning?: boolean,
      disabled?: boolean
      hasError?: boolean
      variant?: string
      acceptTypes?: string
}

export function FileInputForm(props: Props) {
      const [valid, setValid] = React.useState<boolean>(true)
      const field = useField(props.name, '' as any);
      const error = useSubscriber(field.error)
      const fieldValue = useSubscriber(field)
      const loading = useSubscriber(useFormControl().loading)

      const handleInputBlur = (event: any) => {
            if (event.target.value == '' && props.required) {
                  setValid(false)
                  return
            } setValid(true)
      }

      React.useEffect(() => {
            if(error) {
                  setValid(false)
            }
          }, [error])
      
      React.useEffect(() => {
            if(props.hasError != undefined && fieldValue == '' && props.required) {
                  setValid(props.hasError)
            }
      }, [fieldValue, props.hasError, props.required])

      return (
            <div>
                  <label htmlFor={props.name} className="form-label text-nowrap">{props.label} {props.required &&  <span className="text-danger">*</span>}</label>
                  <div className="placeholder">
                        <input
                              name={props.name}
                              readOnly={props.readonly}
                              disabled={props.disabled}
                              type={'file'}
                              accept={props.acceptTypes}
                              placeholder={props.placeholder}
                              id={props.id}
                              className={`form-control ${props.variant ? props.variant : 'form-control'} ${!loading ? '' : 'animated-background'}   ${valid ? '' : 'is-invalid'} ${props.warning ? 'border border-warning' : ''}`}
                              onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                          field.next(file);
                                    }
                              }}
                              onBlur={handleInputBlur}
                        />
                  </div>
                  {error && (
                        <div id="validationServerUsernameFeedback" className="position-absolute">
                              {Array.isArray(error) ? error.map((x) => <span className="text-danger" >{x}</span>) : error}
                        </div>
                  )}
            </div>
      )
}


