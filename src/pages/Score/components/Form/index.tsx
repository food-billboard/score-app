import { Form, TextArea, FormProps, Input } from 'antd-mobile';
import ContentSelect from '../ContentSelect';

const Edit = (props: {
  formProps?: Partial<FormProps>;
  editable?: boolean | string[];
}) => {
  const { formProps } = props;

  const { form } = formProps || {};

  return (
    <div>
      <Form {...formProps}>
        <Form.Item
          name="target_score"
          label="积分分数"
          rules={[{ required: true }]}
          initialValue={1}
        >
          <Input placeholder="请输入积分分数" type="number" />
        </Form.Item>
        <Form.Item
          name="create_content"
          label="积分原因"
          rules={[{ required: true }]}
          initialValue={''}
        >
          <TextArea placeholder="请输入积分原因" autoSize={{ minRows: 2 }} />
        </Form.Item>
        <Form.Item label="描述" name="create_description">
          <TextArea placeholder="请输入描述" />
        </Form.Item>
        <Form.Item dependencies={['create_content']}>
          {({ getFieldValue }) => {
            return (
              <ContentSelect
                create_content={getFieldValue('create_content') || ''}
                onSelect={(_, { label, description }) => {
                  form?.setFieldsValue({
                    create_content: label,
                    create_description: description,
                  });
                }}
              />
            );
          }}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Edit;
