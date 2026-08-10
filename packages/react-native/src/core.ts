import {type ComponentType, createElement} from 'react';
import {SvgXml, type XmlProps} from 'react-native-svg';

export type AwsIconProps = Omit<XmlProps, 'xml'> & {
  /** Accessible label. Without it the icon is hidden from screen readers. */
  title?: string;
};

export type AwsIconComponent = ComponentType<AwsIconProps>;

/** Factory used by the generated icon modules — not meant for direct use. */
export const createAwsIcon = (
  displayName: string,
  xml: string,
): AwsIconComponent => {
  const Component: AwsIconComponent = ({title, ...props}) =>
    createElement(SvgXml, {
      xml,
      accessible: Boolean(title),
      accessibilityLabel: title,
      width: 24,
      height: 24,
      ...props,
    });
  (Component as {displayName?: string}).displayName = displayName;
  return Component;
};
