import React, { useState } from 'react';
import { ObjectInputProps, set } from 'sanity';
import { Button, Card, Stack, Text, Flex, Box } from '@sanity/ui';
import { TransferIcon } from '@sanity/icons';
import { translateBlockContent } from '../lib/translate';

export function TranslateBlockInput(props: ObjectInputProps) {
  const { onChange, value = {}, schemaType, renderDefault } = props;
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    console.log('Translate button clicked');
    console.log('Current value:', value);
    
    if (!value?.en || !Array.isArray(value.en)) {
      alert('Please enter English content first');
      return;
    }

    console.log('Starting translation of', value.en.length, 'blocks');
    setIsTranslating(true);
    
    try {
      // Translate the blocks directly
      const translatedBlocks = await translateBlockContent(value.en);
      console.log('Translation completed, got', translatedBlocks.length, 'translated blocks');
      
      // Generate new keys for translated blocks
      const spanishBlocks = translatedBlocks.map(block => ({
        ...block,
        _key: generateKey(),
        // Also generate new keys for children if they exist
        children: block.children?.map((child: any) => ({
          ...child,
          _key: generateKey()
        })) || block.children
      }));
      
      console.log('Setting Spanish blocks:', spanishBlocks);
      onChange(set({
        ...value,
        es: spanishBlocks
      }));
      
      console.log('Translation complete!');
    } catch (error) {
      console.error('Translation error:', error);
      alert(`Translation failed: ${error.message || 'Unknown error'}`);
    } finally {
      setIsTranslating(false);
    }
  };

  // Generate unique key for blocks
  const generateKey = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  return (
    <Stack space={4}>
      <Flex justify="flex-end">
        <Button
          fontSize={1}
          icon={TransferIcon}
          mode="bleed"
          onClick={handleTranslate}
          disabled={!value?.en || isTranslating}
          text={isTranslating ? 'Translating content...' : 'Translate to Spanish'}
          tone="primary"
        />
      </Flex>
      
      <Box>
        {renderDefault(props)}
      </Box>
      
      {value?.es && value.es.length > 0 && (
        <Card padding={2} radius={2} tone="positive" border>
          <Text size={1} muted>
            ✅ Spanish translation complete! Please review and edit the Spanish content as needed.
          </Text>
        </Card>
      )}
    </Stack>
  );
}