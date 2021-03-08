import React from 'react'
import PropTypes from 'prop-types'
import './InputField.css'

const InputField = ({ type, name, label, value, dataListItems, onChange, ...props }) => (
  <label className='input-field'>
    <span>{label}</span>

    {type === 'textarea'
      ? <textarea
        name={name}
        value={value}
        onChange={onChange}
        {...props} />
      : <input
        type={type || 'text'}
        name={name}
        value={value}
        list={dataListItems ? `${name}_items` : ''}
        onChange={onChange}
        {...props} />
    }

    {dataListItems && (
      <datalist id={`${name}_items`}>
        {dataListItems.map(item => (
          <option key={item} value={item} />
        ))}
      </datalist>
    )}
  </label>
)

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  dataListItems: PropTypes.array
}

export default InputField
