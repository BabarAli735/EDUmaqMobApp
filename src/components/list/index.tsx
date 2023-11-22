import React from 'react';
import { FlatList, RefreshControl, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { ErrorIndicator, HorizontalDivider, LoadingIndicator } from '..';
import { Colors } from '../../assets';

interface Props<T> {
  items: T[] | undefined;
  message?: string | undefined;
  isRetry?: boolean | undefined;
  isLoading?: boolean | undefined;
  onRetry?: () => void;
  onRefresh?: () => void;
  onRender: (item: T, index: number) => React.ReactNode | undefined | null;
}

export function ContentList<T>({ items, message, isRetry, isLoading, onRetry, onRefresh, onRender }: Props<T>) {
  const [isRefreshing, setRefreshing] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isLoading) {
      setRefreshing(false);
    }
  }, [isLoading]);

  return (
    <FlatList
      data={items}
      disableVirtualization={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => <>{onRender(item, index)}</>}
      ItemSeparatorComponent={() => <HorizontalDivider width={5} />}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            if (onRefresh) {
              setRefreshing(true);
              onRefresh();
            }
          }}
          tintColor={Colors.WHITE}
        />
      }
      ListEmptyComponent={() => {
        return isLoading ? <LoadingIndicator /> : !items || items.length === 0 ? <ErrorIndicator isRetry={isRetry} message={message} onRetry={() => onRetry && onRetry()} /> : null;
      }}
      contentContainerStyle={{ ..._styles.container, justifyContent: items && items.length > 0 ? 'flex-start' : 'center' }}
    />
  );
}

const _styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 5,
    justifyContent: 'center',
  },
});

interface Prop {
  style?: StyleProp<ViewStyle> | undefined;
  contentContainerStyle?: StyleProp<ViewStyle> | undefined;
  children: React.ComponentType<any> | React.ReactElement | null | undefined;
}

export function VirtualizedList({ style, contentContainerStyle, children }: Prop) {
  return (
    <FlatList data={[]} style={style} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={contentContainerStyle} keyExtractor={() => 'key'} renderItem={null} ListHeaderComponent={<>{children}</>} />
  );
}
