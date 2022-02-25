import React, { useState, useEffect, useRef } from 'react'

import { Table, Button, Modal, Switch, } from 'antd';
import { UnorderedListOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

import UserForm from '../../../components/uesr-manage/UserForm';

const { confirm } = Modal

export default function UserList() {

  const [dataSource, setDataSource] = useState([])
  const [isUpdataVisible, setIsUpdataVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [roleList, setRoleList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const addForm = useRef(null)
  const updataForm = useRef(null)


  useEffect(() => {
    axios.get('http://localhost:3000/users?_expand=role').then((res) => {
      setDataSource(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3000/roles').then((res) => {
      setRoleList(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3000/regions').then((res) => {
      setRegionList(res.data)
    })
  }, [])

  const columns = [
    {
      title: '时期',
      dataIndex: 'region',
      filters:[
        ...regionList.map((item)=>({
          text:item.title,
          value:item.value
        })),{
          text:'未知',
          value:''
        }
      ],
      onFilter:(value,item)=>item.region===value,
      render: (region) => {
        return <b>{region === '' ? '未知' : region}</b>
      },
      
    },
    {
      title: '角色名',
      dataIndex: 'role',
      render: (role) => {
        return role.roleName
      }
    },
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, item) => {
        return <Switch checked={roleState} disabled={item.default} onChange={() => {
          handleChange(item)
        }}></Switch>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>

          <Button type="primary" shape="round" icon={<UnorderedListOutlined />} onClick={() => {

            setTimeout(() => {
              setIsUpdataVisible(true);
              // console.log(item);
              updataForm.current.setFieldsValue(item)
              setCurrentId(item.id)
            }, 0)
          }} disabled={item.default} />

          <Button danger type="primary" shape="round" icon={<DeleteOutlined />} onClick={() => isDelet(item)} disabled={item.default} />

        </div>
      }
    },
  ]

  //开关状态改变控制权限
  const handleChange = (item) => {
    // console.log(item);
    item.roleState = !item.roleState
    setDataSource([...dataSource])
    axios.patch(`http://localhost:3000/users/${item.id}`, { roleState: item.roleState })
  }

  const isDelet = (item) => {
    confirm({
      title: '确认要删除吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deletMethod(item)
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }
  //删除角色
  const deletMethod = (item) => {
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.delete(`http://localhost:3000/users/${item.id}`)
  }


  const onCancel = () => {
    setIsVisible(false)
  }

  //点击保存向后台添加数据
  const formOk = () => {
    addForm.current.validateFields().then(value => {
      // console.log(value);
      setIsVisible(false)
      addForm.current.resetFields()
      axios.post(`http://localhost:3000/users`, {
        ...value,
        "roleState": true,
        "defult": false
      }).then(
        () => {
          axios.get('http://localhost:3000/users?_expand=role').then((res) => {
            setDataSource(res.data)
          })
        }
      )

    }).catch((err) => {
      console.log(err);
    })
  }
  const updataOk = () => {

    updataForm.current.validateFields().then(value => {
      setIsVisible(false)
      // updataForm.current.resetFields()
      console.log(value);
      console.log(currentId);
      setDataSource(dataSource.map(item=>{
        // console.log(item);
        if (item.id===currentId) {
          return {
            ...item,
            ...value,
            role:roleList.filter(data=>data.id===value.roleId)[0]
          }
        }
        return item
      }))
      setIsUpdataVisible(false)
      
      axios.patch(`http://localhost:3000/users/${currentId}`,value)
    }) 


  }
  const updataCancel = () => {
    setIsUpdataVisible(false)
  }


  return (
    <div>
      <Button type='primary' onClick={() => {
        setIsVisible(true)
      }}>添加用户</Button>

      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 8 }} rowKey={(item) => item.id} />

      <Modal visible={isUpdataVisible}
        title="更新用户"
        okText="保存"
        cancelText="取消"
        onCancel={updataCancel}
        onOk={() => {
          updataOk()
        }}>

        <UserForm roleList={roleList} regionList={regionList} ref={updataForm} />

      </Modal>

      <Modal
        visible={isVisible}
        title="添加新用户"
        okText="确认"
        cancelText="取消"
        onCancel={onCancel}
        onOk={() => {
          formOk()
        }}
      >
        <UserForm roleList={roleList} regionList={regionList} ref={addForm} />
      </Modal>

    </div>
  )
}
