import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Space,
  Spin,
  Upload,
  UploadFile,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useContext, useEffect, useState } from "react";
import "./ProductsDashboard.css";
import { RcFile, UploadProps } from "antd/es/upload";
import axios from "axios";
import { AppContext } from "../../../App";

const moneyFormatter = new Intl.NumberFormat("vi", {
  style: "currency",
  currency: "VND",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
const ProductsDashboard = () => {
  const columns: ColumnsType<any> = [
    {
      title: "Mã sản phẩm",
      dataIndex: "Code",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "Name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "Image",
      render: (theImageURL) => <img alt={theImageURL} src={theImageURL} />,
    },
    {
      title: "Giá tiền",
      dataIndex: "Price",
      render: (Price) => moneyFormatter.format(Price),
    },
    {
      title: "Nhãn hiệu",
      dataIndex: "BrandName",
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "CategoryName",
    },
    {
      title: "Chức năng",
      dataIndex: "Id",
      render: (Id) => (
        <Space size="middle">
          <Button size="small" type="ghost" onClick={() => openEdit(Id)}>Cập nhật</Button>
        </Space>
      ),
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { baseApi, currentToken } = useContext(AppContext);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const cancelEditModal = () => setIsEditModalOpen(false);
  const [form] = Form.useForm();
  const [Editform] = Form.useForm();
  // them san pham (them anh)
  const [currentId, setCurrentId] = useState<number>(-1);
  const [fileList, setFileList] = useState<any[]>([]);
  const [fileListPreview, setFileListPreview] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
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
  // const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  //   return false;
  // }
  // const handleChangePreview: UploadProps['onChange'] = ({ fileList: newFileList }) => {
  //   setFileListPreview(newFileList);
  //   return false;
  // }
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
  const propsPreviewFile: UploadProps = {
    onRemove: (file) => {
      const index = fileListPreview.indexOf(file);
      const newFileList = fileListPreview.slice();
      newFileList.splice(index, 1);
      setFileListPreview(newFileList);
    },
    beforeUpload: (file) => {
      setFileListPreview([...fileListPreview, file]);
      return false;
    },
  }
  // api danh sách sản phẩm
  const [state, setstate] = useState<any[]>([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getData();
    getSelects();
  }, []);

  const getData = async () => {
    await axios.get("https://localhost:7182/api/Products").then((res) => {
      setloading(false);
      setstate(res.data);
    });
  };
  const getSelects = () => {
    axios.get(`${baseApi}/Brands/GetBrands`).then(res => setBrands(res.data))
    axios.get(`${baseApi}/Categories/GetCategories`).then(res => setCategories(res.data))
  }
  const openEdit = async (id: any) => {
    const product = state.find(p => p.Id === id);
    setCurrentId(id)
    Editform.setFieldsValue({
      "Code": product.Code,
      "Name": product.Name,
      "Price": product.Price,
      "Color": product.Color,
      "CaseMeterial": product.CaseMeterial,
      "CaseSize": product.CaseSize,
      "GlassMaterial": product.GlassMaterial,
      "Movement": product.Movement,
      "WaterResistant": product.WaterResistant,
      "Description": product.Description,
      "Warranty": product.Warranty,
      "BrandId": brands.find(b => b.Name === product.BrandName).Id,
      "CategoryId": categories.find(c => c.Name === product.CategoryName).Id,
    })
    setFileList([{
      uid: 0,
      name: product.Image,
      status: 'done',
      url: product.Image
    }])
    const previews: string[] = JSON.parse(product.PreviewImages)
    setFileListPreview(previews.map((i, index) => {
      return {
        uid: index,
        name: i + index,
        status: 'done',
        url: i
      }
    }))
    setIsEditModalOpen(true)
  }
  const createProduct = (values: any) => {
    message.open({ key: 'create', content: 'Đang tạo...', type: 'loading' })
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      formData.append(key, values[key])
    })
    formData.append('ImageFile', fileList[0])
    fileListPreview.forEach(file => {
      formData.append('PreviewImageFiles', file)
    })
    axios.post(`${baseApi}/Products/AddProduct`, formData, {
      headers: {
        'Authorization': `Bearer ${currentToken}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(() => {
      message.open({ key: 'create', content: 'Tạo thành công!', type: 'success' })
      getData()
      form.resetFields()
      setFileList([])
      setFileListPreview([])
      toggleModal()
    }).catch(err => {
      console.log(err);

      message.open({ key: 'create', content: `Lỗi: ${err.response.data}!`, type: 'error' })
    })
  }
  const updateProduct = (values: any) => {
    message.open({ key: 'update', content: "Đang cập nhật...", type: 'loading' })
    const formData = new FormData();
    formData.append("Id", `${currentId}`);
    Object.keys(values).forEach(key => {
      formData.append(key, values[key])
    })
    formData.append('ImageFile', fileList[0])
    fileListPreview.forEach(file => {
      formData.append('PreviewImageFiles', file)
    })
    axios.put(`${baseApi}/Products/${currentId}`, formData, {
      headers: {
        'Authorization': `Bearer ${currentToken}`
      }
    }).then(async () => {
      await getData()
      message.open({ key: 'update', content: "Cập nhật thành công!", type: 'success' })
      cancelEditModal();
      Editform.resetFields();
      setCurrentId(-1);
      setFileList([])
      setFileListPreview([])
    }).catch(err => message.open({ key: 'update', content: `Lỗi: ${err.response.data}!`, type: 'error' }))
  }
  //
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="table-das-container"
      >
        <div className="title-das-products"><span style={{ color: "rgb(73, 99, 175)" }}>Danh sách sản phẩm</span></div>
        <div>
          <Button
            onClick={toggleModal}
            style={{ color: "#fff", backgroundColor: "#000000" }}
          >
            Thêm sản phẩm
          </Button>
          <Modal
            title="Thêm sản phẩm"
            open={isModalOpen}
            onCancel={toggleModal}
            footer={null}
            className="modal-add-products"
          >
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              layout="horizontal"
              style={{ maxWidth: 600 }}
              form={form}
              onFinish={createProduct}
            >
              <Form.Item
                name="Code"
                label={<span style={{ color: "#000000" }}>Mã sản phẩm</span>}
                rules={[{ required: true, message: "Vui lòng nhập mã sản phẩm" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="Name"
                label={<span style={{ color: "#000000" }}>Tên sản phẩm</span>}
                rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="Price"
                label={<span style={{ color: "#000000" }}>Giá tiền</span>}
                rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm" }]}
                initialValue={1000}
                style={{ minWidth: '20vw' }}
              >
                <InputNumber min={1000} max={2000000000} type="number" />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#000000" }}>Hình ảnh</span>}
              >
                <Upload
                  {...propsFile}
                  accept="image/*"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={onPreview}
                  maxCount={1}
                >
                  {fileList.length < 1 && "+ Upload"}
                </Upload>
              </Form.Item>
              <Form.Item
                name="Color"
                label={<span style={{ color: "#000000" }}>Màu sắc</span>}
                initialValue={"Vàng"}
              >
                <Select
                  showSearch
                  style={{
                    width: 150,
                    fontWeight: "bold",
                  }}
                  placeholder="Màu sắc"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={[
                    {
                      value: "Vàng",
                      label: "Vàng",
                    },
                    {
                      value: "Hồng",
                      label: "Hồng",
                    },
                    {
                      value: "Bạch Kim",
                      label: "Bạch Kim",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#000000" }}>Preview Image</span>}
              >
                <Upload
                  {...propsPreviewFile}
                  accept="image/*"
                  listType="picture-card"
                  onPreview={onPreview}
                  maxCount={4}
                >
                  {fileListPreview.length < 4 && "+ Upload"}
                </Upload>
              </Form.Item>
              <Form.Item
                name="CaseMaterial"
                label={<span style={{ color: "#000000" }}>Chất liệu vỏ</span>}
                initialValue={"Thép không gỉ"}
              >
                <Select
                  showSearch
                  style={{
                    width: 150,
                    fontWeight: "bold",
                  }}
                  placeholder="Chất liệu vỏ"
                  options={[
                    {
                      value: "Thép không gỉ",
                      label: 'Thép không gỉ'
                    },
                    {
                      value: "Titanium",
                      label: 'Titanium'
                    },
                    {
                      value: "Vàng",
                      label: 'Vàng'
                    },
                    {
                      value: "Bạch Kim",
                      label: 'Bạch Kim'
                    },
                    {
                      value: "Carbon",
                      label: 'Carbon'
                    },
                    {
                      value: "Ceramic",
                      label: 'Ceramic'
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="CaseSize"
                label={<span style={{ color: "#000000" }}>Kích thước</span>}
                initialValue={24}
              >
                <Select
                  showSearch
                  style={{
                    width: 150,
                    fontWeight: "bold",
                  }}
                  placeholder="Kích Thước"
                  optionFilterProp="children"
                  options={[
                    {
                      value: 24,
                      label: 24,
                    },
                    {
                      value: 28,
                      label: 28,
                    },
                    {
                      value: 32,
                      label: 32,
                    },
                    {
                      value: 36,
                      label: 36,
                    },
                    {
                      value: 40,
                      label: 40,
                    },
                    {
                      value: 44,
                      label: 44,
                    },
                    {
                      value: 48,
                      label: 48,
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="GlassMaterial"
                label={<span style={{ color: "#000000" }}>Mặt kính</span>}
                initialValue={"Sapphire Crystal - Kính Sapphire"}
              >
                <Select
                  showSearch
                  style={{
                    width: 150,
                    fontWeight: "bold",
                  }}
                  placeholder="Loại kính"
                  optionFilterProp="children"
                  options={[
                    {
                      value: "Sapphire Crystal - Kính Sapphire",
                      label: "Sapphire Crystal - Kính Sapphire",
                    },
                    {
                      value: "Acrylic Crystal - Kính Mica",
                      label: "Acrylic Crystal - Kính Mica",
                    },
                    {
                      value: "Mineral Crystal - Kính khoáng",
                      label: "Mineral Crystal - Kính khoáng",
                    },
                    {
                      value: "Hardlex Crystal - Kính Hardlex",
                      label: "Hardlex Crystal - Kính Hardlex",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="Movement"
                label={<span style={{ color: "#000000" }}>Bộ máy</span>}
                initialValue={"Đồng hồ Quartz"}
              >
                <Select
                  showSearch
                  style={{
                    width: 150,
                    fontWeight: "bold",
                  }}
                  placeholder="Bộ máy"
                  options={[
                    {
                      value: "Đồng hồ Quartz",
                      label: 'Đồng hồ Quartz'
                    },
                    {
                      value: "Đồng hồ cơ - ETA",
                      label: 'Đồng hồ cơ - ETA'
                    },
                    {
                      value: "Đồng hồ cơ - Sellita",
                      label: 'Đồng hồ cơ - Sellita'
                    },
                    {
                      value: "Đồng hồ cơ - Miyota",
                      label: 'Đồng hồ cơ - Miyota'
                    },
                    {
                      value: "Đồng hồ cơ - Ronda",
                      label: 'Đồng hồ cơ - Ronda'
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="WaterResistant"
                label={<span style={{ color: "#000000" }}>Kháng nước</span>}
                initialValue={30}
              >
                <Select
                  showSearch
                  style={{
                    width: 150,
                    fontWeight: "bold",
                  }}
                  placeholder="Mức ATM"
                  optionFilterProp="children"
                  options={[
                    {
                      value: 30,
                      label: 30,
                    },
                    {
                      value: 50,
                      label: 50,
                    },
                    {
                      value: 100,
                      label: 100,
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="Description"
                label={<span style={{ color: "#000000" }}>Mô tả</span>}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="Warranty"
                label={<span style={{ color: "#000000" }}>Bảo hành</span>}
                initialValue={1}
              >
                <InputNumber min={1} max={10} />
              </Form.Item>
              <Form.Item
                name="CategoryId"
                label={<span style={{ color: "#000000" }}>Loại sản phẩm</span>}
                initialValue={1}
              >
                <Select
                  showSearch
                  style={{
                    width: 150,
                    fontWeight: "bold",
                  }}
                  placeholder="Loại sản phẩm"
                  optionFilterProp="children"
                  options={categories.map(cate => (
                    {
                      label: cate.Name,
                      value: cate.Id
                    }
                  ))}
                />
              </Form.Item>
              <Form.Item
                name="BrandId"
                label={<span style={{ color: "#000000" }}>Nhà sản xuất</span>}
                initialValue={1}
              >
                <Select
                  showSearch
                  style={{
                    width: 150,
                    fontWeight: "bold",
                  }}
                  placeholder="Nhà sản xuất"
                  optionFilterProp="children"
                  options={brands.map(brand => (
                    {
                      label: brand.Name,
                      value: brand.Id
                    }
                  ))}
                />
              </Form.Item>
              <Form.Item >
                <Button style={{ color: "#fff", backgroundColor: "#000000", marginLeft: "70%" }} htmlType="submit">
                  Thêm sản phẩm
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
      <div>
        {loading ? (
          <Spin style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20%"
          }} delay={1000} />
        ) : (
          <Table
            rowKey={"Code"}
            style={{ paddingTop: "3%" }}
            columns={columns}
            dataSource={state}
            pagination={{ pageSize: 5, position: ['bottomCenter'] }}
            scroll={{ x: '100%' }}
          />
        )}
      </div>
      <Modal
        title="Sửa sản phẩm"
        open={isEditModalOpen}
        onCancel={cancelEditModal}
        footer={null}
        className="modal-add-products"
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          form={Editform}
          onFinish={updateProduct}
        >
          <Form.Item
            name="Code"
            label={<span style={{ color: "#000000" }}>Mã sản phẩm</span>}
            rules={[{ required: true, message: "Vui lòng nhập mã sản phẩm" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Name"
            label={<span style={{ color: "#000000" }}>Tên sản phẩm</span>}
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Price"
            label={<span style={{ color: "#000000" }}>Giá tiền</span>}
            rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm" }]}
            initialValue={1000}
            style={{ minWidth: '20vw' }}
          >
            <InputNumber min={1000} max={2000000000} type="number" />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: "#000000" }}>Hình ảnh</span>}
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
            name="Color"
            label={<span style={{ color: "#000000" }}>Màu sắc</span>}
            initialValue={"Vàng"}
          >
            <Select
              showSearch
              style={{
                width: 150,
                fontWeight: "bold",
              }}
              placeholder="Màu sắc"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: "Vàng",
                  label: "Vàng",
                },
                {
                  value: "Hồng",
                  label: "Hồng",
                },
                {
                  value: "Bạch Kim",
                  label: "Bạch Kim",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: "#000000" }}>Preview Image</span>}
          >
            <Upload
              accept="image/*"
              listType="picture-card"
              fileList={fileListPreview}
              {...propsPreviewFile}
              onPreview={onPreview}
              maxCount={4}
            >
              {fileListPreview.length < 4 && "+ Upload"}
            </Upload>
          </Form.Item>
          <Form.Item
            name="CaseMaterial"
            label={<span style={{ color: "#000000" }}>Chất liệu vỏ</span>}
            initialValue={"Thép không gỉ"}
          >
            <Select
              showSearch
              style={{
                width: 150,
                fontWeight: "bold",
              }}
              placeholder="Chất liệu vỏ"
              options={[
                {
                  value: "Thép không gỉ",
                  label: 'Thép không gỉ'
                },
                {
                  value: "Titanium",
                  label: 'Titanium'
                },
                {
                  value: "Vàng",
                  label: 'Vàng'
                },
                {
                  value: "Bạch Kim",
                  label: 'Bạch Kim'
                },
                {
                  value: "Carbon",
                  label: 'Carbon'
                },
                {
                  value: "Ceramic",
                  label: 'Ceramic'
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="CaseSize"
            label={<span style={{ color: "#000000" }}>Kích thước</span>}
            initialValue={24}
          >
            <Select
              showSearch
              style={{
                width: 150,
                fontWeight: "bold",
              }}
              placeholder="Kích Thước"
              optionFilterProp="children"
              options={[
                {
                  value: 24,
                  label: 24,
                },
                {
                  value: 28,
                  label: 28,
                },
                {
                  value: 32,
                  label: 32,
                },
                {
                  value: 36,
                  label: 36,
                },
                {
                  value: 40,
                  label: 40,
                },
                {
                  value: 44,
                  label: 44,
                },
                {
                  value: 48,
                  label: 48,
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="GlassMaterial"
            label={<span style={{ color: "#000000" }}>Mặt kính</span>}
            initialValue={"Sapphire Crystal - Kính Sapphire"}
          >
            <Select
              showSearch
              style={{
                width: 150,
                fontWeight: "bold",
              }}
              placeholder="Loại kính"
              optionFilterProp="children"
              options={[
                {
                  value: "Sapphire Crystal - Kính Sapphire",
                  label: "Sapphire Crystal - Kính Sapphire",
                },
                {
                  value: "Acrylic Crystal - Kính Mica",
                  label: "Acrylic Crystal - Kính Mica",
                },
                {
                  value: "Mineral Crystal - Kính khoáng",
                  label: "Mineral Crystal - Kính khoáng",
                },
                {
                  value: "Hardlex Crystal - Kính Hardlex",
                  label: "Hardlex Crystal - Kính Hardlex",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="Movement"
            label={<span style={{ color: "#000000" }}>Bộ máy</span>}
            initialValue={"Đồng hồ Quartz"}
          >
            <Select
              showSearch
              style={{
                width: 150,
                fontWeight: "bold",
              }}
              placeholder="Bộ máy"
              options={[
                {
                  value: "Đồng hồ Quartz",
                  label: 'Đồng hồ Quartz'
                },
                {
                  value: "Đồng hồ cơ - ETA",
                  label: 'Đồng hồ cơ - ETA'
                },
                {
                  value: "Đồng hồ cơ - Sellita",
                  label: 'Đồng hồ cơ - Sellita'
                },
                {
                  value: "Đồng hồ cơ - Miyota",
                  label: 'Đồng hồ cơ - Miyota'
                },
                {
                  value: "Đồng hồ cơ - Ronda",
                  label: 'Đồng hồ cơ - Ronda'
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="WaterResistant"
            label={<span style={{ color: "#000000" }}>Kháng nước</span>}
            initialValue={30}
          >
            <Select
              showSearch
              style={{
                width: 150,
                fontWeight: "bold",
              }}
              placeholder="Mức ATM"
              optionFilterProp="children"
              options={[
                {
                  value: 30,
                  label: 30,
                },
                {
                  value: 50,
                  label: 50,
                },
                {
                  value: 100,
                  label: 100,
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="Description"
            label={<span style={{ color: "#000000" }}>Mô tả</span>}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Warranty"
            label={<span style={{ color: "#000000" }}>Bảo hành</span>}
            initialValue={1}
          >
            <InputNumber min={1} max={10} />
          </Form.Item>
          <Form.Item
            name="CategoryId"
            label={<span style={{ color: "#000000" }}>Loại sản phẩm</span>}
            initialValue={1}
          >
            <Select
              showSearch
              style={{
                width: 150,
                fontWeight: "bold",
              }}
              placeholder="Loại sản phẩm"
              optionFilterProp="children"
              options={categories.map(cate => (
                {
                  label: cate.Name,
                  value: cate.Id
                }
              ))}
            />
          </Form.Item>
          <Form.Item
            name="BrandId"
            label={<span style={{ color: "#000000" }}>Nhà sản xuất</span>}
            initialValue={1}
          >
            <Select
              showSearch
              style={{
                width: 150,
                fontWeight: "bold",
              }}
              placeholder="Nhà sản xuất"
              optionFilterProp="children"
              options={brands.map(brand => (
                {
                  label: brand.Name,
                  value: brand.Id
                }
              ))}
            />
          </Form.Item>
          <Form.Item >
            <Button style={{ color: "#fff", backgroundColor: "#000000", marginLeft: "70%" }} htmlType="submit">
              Sửa sản phẩm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductsDashboard
