import React, { forwardRef, useState } from 'react'
import { Form, Input, Select } from 'antd';
const { Option } = Select;


const UserForm = forwardRef((props, ref) => {

  const [isDisable, setIsDisable] = useState(true);

  return (
    <div>
      <Form
        layout="vertical"
        ref={ref}
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="region"
          label="时期"
          rules={isDisable === 1 ? [] : [
            {
              required: true,
              message: '请选择地区',
            },
          ]}

        >
          <Select style={{ width: '100%' }}
            disabled={isDisable} >
            {
              props.regionList.map(item => {
                return <Option value={item.value} key={item.id} >{item.value}</Option>
              })
            }
          </Select>
        </Form.Item>


        <Form.Item
          name="roleId"
          label="角色"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        >
          <Select style={{ width: '100%' }} onChange={(value) => {
            console.log(value);
            if (value === 1) {
              setIsDisable(true)
              ref.current.setFieldsValue({
                region: ''
              })
            } else {
              setIsDisable(false)
            }
          }} >
            {
              props.roleList.map(item => {
                return <Option value={item.id} key={item.id} >{item.roleName}</Option>
              })
            }
          </Select>
        </Form.Item>

      </Form>
    </div>
  )
}
)

export default UserForm