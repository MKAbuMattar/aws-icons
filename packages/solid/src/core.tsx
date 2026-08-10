import {type Component, type JSX, splitProps} from 'solid-js';

export type AwsIconProps = JSX.SvgSVGAttributes<SVGSVGElement> & {
  /** Accessible label. Without it the icon is aria-hidden (decorative). */
  title?: string;
};

export type AwsIconComponent = Component<AwsIconProps>;

/** Factory used by the generated icon modules — not meant for direct use. */
export const createAwsIcon = (
  name: string,
  attrs: Record<string, string>,
  html: string,
): AwsIconComponent => {
  const Component: AwsIconComponent = (props) => {
    const [local, rest] = splitProps(props, ['title']);
    return (
      <svg
        {...attrs}
        role="img"
        aria-hidden={local.title ? undefined : 'true'}
        aria-label={local.title}
        innerHTML={html}
        {...rest}
      />
    );
  };
  return Component;
};
