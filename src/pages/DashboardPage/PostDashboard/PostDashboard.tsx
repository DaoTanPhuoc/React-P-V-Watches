import { Button, Checkbox, Form, Input, message, Modal, Row, Space, Upload, UploadFile } from "antd";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FileAddOutlined } from "@ant-design/icons";
import "./PostDashboard.css";
import Table, { ColumnsType } from "antd/es/table";
import { AppContext } from "../../../App";
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import moment from "moment";
import { RcFile, UploadProps } from "antd/es/upload";
const PostDashboard = () => {
  const columns: ColumnsType<any> = [
    {
      title: 'Id',
      dataIndex: "Id"
    },
    {
      title: "Tiêu đề",
      dataIndex: "Title",
    },
    {
      title: "Mô tả",
      dataIndex: "Description",
    },
    {
      title: "Hình ảnh",
      dataIndex: "Thumbnail",
      render: (thumbnail, title) => <img src={thumbnail} alt="Bài viết..."></img>
    },
    {
      title: "Người tạo",
      dataIndex: "UserName",
    },
    {
      title: "Hiển thị",
      dataIndex: "IsDeleted",
      render: (IsDeleted: boolean) => <Checkbox checked={!IsDeleted}></Checkbox>
    },
    {
      title: "Ngày tạo",
      dataIndex: "CreatedAt",
      render: (CreatedAt) => (<p>{moment(CreatedAt).format("DD-MM-YYYY, hh:mm:ss")}</p>)
    },
    {
      title: "Chức năng",
      dataIndex: "Id",
      render: (Id) => (
        <Space align="center">
          <Button style={{ backgroundColor: 'blue', fontWeight: 'bold', color: 'white' }} onClick={() => openModalEdit(Id)}>Cập nhật</Button>
        </Space>
      )
    }
  ];
  const { baseApi, currentToken } = useContext(AppContext);
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false);
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [checkbox, setCheckBox] = useState<boolean>(true);
  const [fileList, setFileList] = useState<any>([]);
  const [content, setContent] = useState<string>("<h2>Tạo nội dung bài viết</h2>")
  const [contentEdit, setContentEdit] = useState<string>("")
  const [postId, setPostid] = useState();
  const [form] = Form.useForm()
  const [formEdit] = Form.useForm()
  const toggleModal = () => {
    setIsOpened(!isOpened)
  }
  const propsFile: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
  }
  const openModalEdit = (postId: any) => {
    setPostid(postId)
    const post = data.find(post => post.Id === postId);
    if (post === undefined) {
      message.error("Vui lòng thử lại");
      return;
    }
    formEdit.setFieldsValue({
      Title: post.Title,
      Description: post.Description,
    })
    setCheckBox(!post.IsDeleted)
    setFileList([{
      uid: "1",
      url: post.Thumbnail,
      thumbUrl: post.Thumbnail
    }])
    setContentEdit(post.Content)
    setOpenEdit(!openEdit)
  }
  const cancelModelEdit = () => {
    setFileList([])
    setContentEdit("")
    setOpenEdit(false)
  }
  const getData = useCallback(() => {
    setLoading(true)
    axios.get(`${baseApi}/News`, {
      headers: {
        'Authorization': `Bearer ${currentToken}`
      }
    }).then(res => setData(res.data)).finally(() => setLoading(false))
  }, [baseApi])
  const createPost = (values: any) => {
    message.open({ type: 'loading', content: 'Đang tạo bài viết...', key: 'create' })

    const formData = new FormData()
    formData.append("Title", values['Title'])
    formData.append("Description", values['Description'])
    formData.append("Content", content)
    formData.append("Thumbnail", fileList[0])

    axios.post(`${baseApi}/News`, formData, {
      headers: {
        'Authorization': `Bearer ${currentToken}`,
        'Content-Type': 'multipart/form-data',
      }
    }).then(() => {
      message.open({ type: 'success', content: 'Tạo bài viết thành công!', key: 'create' })
      getData()
      form.resetFields()
      setContent("<h2>Tạo nội dung bài viết</h2>")
      toggleModal()
    }).catch(err => {
      console.log(err);

      message.open({ type: 'error', content: 'Lỗi: ' + err.response.data, key: 'create' })
    })
  }
  const updatePost = (values: any) => {
    message.open({ type: 'loading', content: 'Đang cập nhật bài viết...', key: 'update' })
    const formData = new FormData()
    formData.append("Id", `${postId}`)
    formData.append("Title", values['Title'])
    formData.append("Description", values['Description'])
    formData.append("Content", contentEdit)
    formData.append("Thumbnail", fileList[0])
    formData.append("IsDeleted", `${!checkbox}`)
    console.log(fileList[0])
    axios.put(`${baseApi}/News/${postId}`, formData, {
      headers: {
        'Authorization': `Bearer ${currentToken}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(() => {
      message.open({ type: 'success', content: 'Cập nhật bài viết thành công!', key: 'update' })
      getData()
      formEdit.resetFields()
      setContentEdit("")
      cancelModelEdit()
    }).catch(err => {
      message.open({ type: 'error', content: 'Lỗi: ' + err.response.data, key: 'update' })
    })
  }
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    return false;
  }
  useEffect(() => {
    getData();
  }, [getData])
  return (
    <>
      <div>
        <div className="container-post">
          <h4
            style={{
              fontWeight: 700,
              padding: 10,
              textTransform: 'uppercase'
            }}
          >
            <h4 style={{ color: "#4963AF", fontWeight: 700, fontSize: 23, textTransform: "uppercase" }}>
              Quản lý bài viết
            </h4>
          </h4>
          <div className="header-post">
            <div className="items-header-post">
              <Button
                style={{ backgroundColor: 'green ' }}
                type="primary"
                icon={<FileAddOutlined />}
                onClick={toggleModal}
              >
                Tạo bài viết
              </Button>
            </div>
            <Modal
              title="Tạo Bài Viết"
              open={isOpened}
              onCancel={toggleModal}
              footer={null}
            >
              <Form
                form={form}
                onFinish={createPost}
                layout="vertical"
              >
                <Form.Item
                  label="Tiêu đề"
                  name="Title"
                  rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Mô tả"
                  name="Description"
                  rules={[{ required: true, message: "Vui lòng nhập Description" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="Thumbnail"
                  label="Hình ảnh"
                >
                  <Upload
                    accept="image/*"
                    listType="picture-card"
                    fileList={fileList}
                    {...propsFile}

                    onPreview={onPreview}
                    maxCount={1}
                  >
                    {fileList.length < 1 && "+ Upload"}
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Nội dung"
                >
                  <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={(event, editor) => {
                      const data = editor.getData()
                      setContent(data)
                    }}
                  />
                </Form.Item>
                <Form.Item>
                  <Row justify={'end'}>
                    <Button type="primary" onClick={toggleModal} style={{ backgroundColor: 'red' }}>Quay lại</Button>
                    <Button type="primary" htmlType="submit" style={{ backgroundColor: 'blue', margin: '0 15px' }}>Tạo bài viết</Button>
                  </Row>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>

        <div className="table-list-blog">
          <div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ marginLeft: 8 }}>
              </span>
            </div>
            <Table
              rowKey={"Id"}
              loading={loading}
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 5, position: ['bottomCenter'] }}
              scroll={{ x: '100%' }}
            />
          </div>
        </div>
      </div>
      <Modal
        title="Cập nhật Bài Viết"
        open={openEdit}
        onCancel={cancelModelEdit}
        footer={null}
      >
        <Form
          form={formEdit}
          layout="horizontal"
          onFinish={updatePost}
        >
          <Form.Item
            label="Tiêu đề"
            name="Title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="Description"
            rules={[{ required: true, message: "Vui lòng nhập Description" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Thumbnail"
            label="Hình ảnh"
            rules={[{
              message: "Vui lòng nhập hình ảnh",
              validator: (_, value) => {
                if (fileList.length < 1) {
                  return Promise.reject()
                }
                return Promise.resolve()
              }
            }]}
          >
            <Upload
              accept="image/*"
              listType="picture-card"
              fileList={fileList}
              {...propsFile}

              onPreview={onPreview}
              maxCount={1}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
          </Form.Item>
          <Form.Item
            label="Nội dung"
          >
            <CKEditor
              editor={ClassicEditor}
              data={contentEdit}
              onChange={(event, editor) => {
                const data = editor.getData()
                setContentEdit(data)
              }}
            />
          </Form.Item>
          <Form.Item
            label="Hiển thị"
            valuePropName="IsDeleted"
            initialValue={checkbox}
          >
            <Checkbox defaultChecked={checkbox} onChange={() => setCheckBox(!checkbox)} />
          </Form.Item>
          <Form.Item>
            <Row justify={'end'}>
              <Button type="primary" onClick={cancelModelEdit} style={{ backgroundColor: 'red' }}>Quay lại</Button>
              <Button type="primary" htmlType="submit" style={{ backgroundColor: 'blue', margin: '0 15px' }}>Cập nhật bài viết</Button>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PostDashboard;
