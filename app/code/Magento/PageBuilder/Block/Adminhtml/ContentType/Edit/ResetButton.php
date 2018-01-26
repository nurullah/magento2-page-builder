<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Magento\PageBuilder\Block\Adminhtml\ContentType\Edit;

use Magento\Framework\View\Element\UiComponent\Control\ButtonProviderInterface;

class ResetButton implements ButtonProviderInterface
{
    /**
     * @var string
     */
    private $targetName;

    /**
     * Constructor
     *
     * @param $targetName
     */
    public function __construct(string $targetName)
    {
        $this->targetName = $targetName;
    }

    /**
     * Retrieve button data
     *
     * @return array
     */
    public function getButtonData()
    {
        return [
            'label' => __('Reset'),
            'class' => 'reset',
            'on_click' => '',
            'data_attribute' => [
                'mage-init' => [
                    'buttonAdapter' => [
                        'actions' => [
                            [
                                'targetName' => $this->targetName,
                                'actionName' => 'reset',
                                'params' => [
                                    false,
                                ]
                            ]
                        ]
                    ]
                ],
                'form-role' => 'reset',
            ],
            'sort_order' => 30
        ];
    }
}