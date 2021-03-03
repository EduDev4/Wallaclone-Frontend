import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Select } from 'antd';

// import { getTags } from '../../../store/selectors';

function SelectTags({ tags, loadTags, onChange, defaultTags, placeholder }) {
  const { Option } = Select;

  useEffect(() => {
    loadTags();
    return () => {};
  }, []);

  return (
    <Select
      onChange={value => {
        onChange({ target: { value, name: 'tags' } });
      }}
      mode="tags"
      style={{ width: '100%' }}
      defaultValue={defaultTags}
      placeholder={placeholder}
    >
      {tags && tags.map(tag => <Option key={tag}>{tag}</Option>)}
    </Select>
  );
}

SelectTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  loadTags: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultTags: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
};

SelectTags.defaultProps = {
  placeholder: '',
  tags: [],
  defaultTags: [],
};

export default SelectTags;
